import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Messages from '../../Messages/index';
import { Socket } from 'socket.io-client';
import React from 'react';

interface ConvosProps {
    socket: Socket | null;
    msgObject: { [key: string]: any[] } | null;
    walletAddr: string | null;
}


const Convos = ({ msgObject, socket, walletAddr }: ConvosProps) => {
    const screenWidth: number = window.screen.width;
    const addrSliceIdx: number | undefined = screenWidth <= 640 ? 6 : undefined;

    return (
        <div className='w-full flex flex-col'>
            {msgObject?.convos.map((c: any, i: number) => {
                const p = addrSliceIdx ? `${c.participants.find((p: string) => p !== walletAddr).slice(0, addrSliceIdx)}...` : 
                                            c.participants.find((p: string) => p !== walletAddr);

                return (
                    <React.Fragment key={i}>
                        <Accordion style={{ backgroundColor: '#18181b', color: 'white' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            >
                                <div className='text-white'>{p}</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Messages msgObject={c.messages} senderId={walletAddr!} receiverId={c.participants.find((p: string) => p !== walletAddr)} />
                            </AccordionDetails>
                        </Accordion>
                        <hr style={{ border: '1px solid dimgrey' }}></hr>
                    </React.Fragment>
                )
            })}
        </div>
    );
}


export default Convos;

