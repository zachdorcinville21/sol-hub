import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Messages from "../../Messages/index";
import { Socket } from "socket.io-client";
import { uc } from "../../util/user-crud";
import React, { useEffect, useState } from "react";

interface ConvosProps {
  socket: Socket | null;
  msgObject: { [key: string]: any[] } | null;
  walletAddr: string | null;
}

const Convos = ({ msgObject, walletAddr }: ConvosProps) => {
  const [convos, setConvos] = useState<Convo[] | undefined>(msgObject?.convos);
  const screenWidth: number = window.screen.width;
  const addrSliceIdx: number | undefined = screenWidth <= 640 ? 6 : undefined;

  const onDelete = async (
    e: React.MouseEvent<HTMLImageElement>,
    senderWallet: string | null,
    receiverWallet: string
  ) => {
    e.stopPropagation();
    await uc.deleteConversation(senderWallet, receiverWallet);
    const newConvos = convos?.filter(
      (c: Convo) => !c.participants.includes(receiverWallet)
    );
    setConvos(newConvos);
  };

  useEffect(() => {
    setConvos(msgObject?.convos);
  }, [msgObject]);

  return (
    <div className="w-full flex flex-col gap-3">
      {convos?.map((c: any, i: number) => {
        const p: string = addrSliceIdx
          ? `${c.participants
              .find((p: string) => p !== walletAddr)
              .slice(0, addrSliceIdx)}...`
          : c.participants.find((p: string) => p !== walletAddr);

        const receiver: string = c.participants.find(
          (p: string) => p !== walletAddr
        );

        return (
          <div key={i} className='w-full px-4 md:p-0'>
            <Accordion
              className="text-white rounded-2xl"
              style={{
                backgroundColor: "#18181b",
                color: "white",
                boxShadow: "0 0 12px black",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  onClick={(e) => onDelete(e, walletAddr, receiver)}
                  src="https://sticnuru.sirv.com/sol-hub-imgs/delete.png"
                  alt="delete-icon"
                  className="w-5 h-5 mr-4 mt-0.5 hover:opacity-50"
                />
                <div className="text-white font-noto font-light">{p}</div>
              </AccordionSummary>
              <AccordionDetails>
                <Messages
                  msgObject={c.messages}
                  senderId={walletAddr!}
                  receiverId={c.participants.find(
                    (p: string) => p !== walletAddr
                  )}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default Convos;
