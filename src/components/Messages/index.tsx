import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket/index";
import ScrollableFeed from "react-scrollable-feed";

interface MsgProps {
  msgObject: any;
  senderId: string;
  receiverId: string;
}

const Messages = ({ msgObject, senderId, receiverId }: MsgProps) => {
  const [msgsToIterate, setMsgs] = useState<Message[]>([]);
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const { socket } = useContext(SocketContext);

  const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMsg(e.currentTarget.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    socket?.emit("send-msg", [senderId, receiverId, currentMsg]);

    setMsgs([
      ...msgsToIterate,
      {
        message_id: msgsToIterate.length + 1,
        author_id: senderId,
        receiver_id: receiverId,
        message: currentMsg,
        created_at: new Date(),
      },
    ]);

    setCurrentMsg("");
  };

  useEffect(() => {
    setMsgs(msgObject);
  }, [msgObject, receiverId]);

  useEffect(() => {
    socket?.on(
      "new-message",
      ({ message, senderWalletAddress, receiverWalletAddress }) => {
        const newMsgs: Message[] = [
          ...msgsToIterate,
          {
            message_id: msgsToIterate.length + 1,
            author_id: senderWalletAddress,
            receiver_id: receiverWalletAddress,
            message: message,
            created_at: new Date(),
          },
        ];

        setMsgs(newMsgs);
      }
    );
  }, [socket, msgsToIterate]);

  const msgContainerHeight: number =
    msgsToIterate && msgsToIterate.length < 5 ? 50 : 80;

  return (
    <div
      className={`w-full bg-black h-${msgContainerHeight} flex flex-col px-6 pt-4 rounded-md`}
    >
      <ScrollableFeed className="w-full h-5/6 flex flex-col gap-4 overflow-auto">
        {msgsToIterate?.map((m: Message, i: number) => {
          if (m.author_id !== senderId) {
            return (
              <div
                key={i}
                className="w-40 self-start bg-gray-400 text-black p-2 rounded-lg font-noto"
                style={{ overflowWrap: "break-word" }}
              >
                {m.message}
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className="w-40 self-end bg-blue-800 text-white p-2 rounded-lg font-noto"
                style={{ overflowWrap: "break-word" }}
              >
                {m.message}
              </div>
            );
          }
        })}
      </ScrollableFeed>
      <div className="flex flex-col md:flex-row gap-4 bg-black bottom-0 mt-2 pb-2 sticky justify-center">
        <input
          value={currentMsg}
          onChange={handleMsgChange}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="message"
          className="rounded-md font-noto p-4 outline-none w-full bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white"
        />
        <button
          onClick={sendMessage}
          className="p-4 rounded-md hover:bg-blue-800 transition-colors text-center font-noto bg-blue-700 text-white w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
