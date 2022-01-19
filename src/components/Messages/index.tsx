import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket/index';
import { Message } from '../util/types/Message';

interface MsgProps {
    msgObject: any;
    senderId: string;
    receiverId: string;
}

const Messages = ({ msgObject, senderId, receiverId }: MsgProps) => {
    const [msgsToIterate, setMsgs] = useState<Message[]>([]);
    const [currentMsg, setCurrentMsg] = useState<string>('');

    const { socket } = useContext(SocketContext);

    const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMsg(e.currentTarget.value);
    }
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    }

    const sendMessage = () => {
        socket?.emit('send-msg', [senderId, receiverId, currentMsg]);

        setMsgs([...msgsToIterate, {
            message_id: msgsToIterate.length + 1,
            author_id: senderId,
            receiver_id: receiverId,
            message: currentMsg,
            created_at: new Date(),
        }]);

        setCurrentMsg('');
    }

    useEffect(() => {
        setMsgs(msgObject);
    }, [msgObject, receiverId]);

    useEffect(() => {
        socket?.on('new-message', ({ message, senderWalletAddress, receiverWalletAddress }) => {
            const newMsgs: Message[] = [...msgsToIterate, {
                message_id: msgsToIterate.length + 1,
                author_id: senderWalletAddress,
                receiver_id: receiverWalletAddress,
                message: message,
                created_at: new Date(),
            }];

            setMsgs(newMsgs);
        });
    }, [socket, msgsToIterate]);

    const msgContainerHeight: number = msgsToIterate && msgsToIterate.length < 5 ? 50 : 80;

    return (
        <div className={`w-full bg-black h-${msgContainerHeight} flex flex-col px-6 pt-4 rounded-md`}>
            <div className='w-full h-5/6 flex flex-col gap-4 overflow-y-scroll'>
                {msgsToIterate?.map((m: Message, i: number) => {
                    if (m.author_id !== senderId) {
                        return (
                            <div key={i} className='w-40 self-start bg-gray-400 text-black p-2 rounded-lg'>
                                {m.message}
                            </div>
                        );
                    } else {
                        return (
                            <div key={i} className='w-40 self-end bg-blue-800 text-white p-2 rounded-lg' style={{ overflowWrap: 'break-word' }}>
                                {m.message}
                            </div>
                        );
                    }
                })}
            </div>
            <div className='flex gap-4 bg-black bottom-0 mt-2 pb-2 sticky justify-center'>
                <input value={currentMsg} onChange={handleMsgChange} onKeyPress={handleKeyPress} type='text' placeholder='message' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                <button onClick={sendMessage} className='p-4 w-40 rounded-md hover:bg-blue-800 transition-colors text-center bg-blue-700 text-white'>Send</button>
            </div>
        </div>
    );
}


export default Messages;

