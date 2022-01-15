import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Convos from './util/Convos';
import { Convo } from '../util/types/Message';
import { NotifUpdateConfig } from '../SolHub/util/types';
import { uc } from '../util/user-crud/index';

interface MMProps {
    open: boolean;
    walletAddress: string | null;
    newMsg: string;
    openSentAlert: () => void;
    handleClose: () => void;
    updateNotifCount: (val: number, options?: NotifUpdateConfig) => void;
}

export const MessagesModal = ({ open, walletAddress, newMsg, handleClose, openSentAlert }: MMProps) => {
    const [address, setAddress] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [msgObject, setMsgObj] = useState<{ [key: string]: Convo[] } | null>(null);
    const [showMsgForm, toggleMsgForm] = useState<boolean>(false);
    const [msgSent, setSent] = useState<boolean>(false);

    const { socket } = useContext(SocketContext);

    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.currentTarget.value);
    }

    const onMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.currentTarget.value);
    }

    const sendMessage = () => {
        socket?.emit('send-msg', [walletAddress, address, msg]);
        setMsgObj(msgObject);
        openSentAlert();
    }

    useEffect(() => {
        (async () => {
            console.log('fetching convos..')
            try {
                const data = await uc.getConversations(walletAddress!);
                console.log(data);
                setMsgObj(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [walletAddress, newMsg, msgSent]);

    const modalWidth: string = 'w-11/12 sm:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12';
    const newInputWidth: string = 'w-52';
    const newSendBtnWidth: string = 'w-30';

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            keepMounted
        >
            <Fade in={open}>
                <div style={{ transform: 'translate(-50%, -50%)' }} className={`overflow-scroll rounded-md outline-none ${modalWidth} absolute top-2/4 left-2/4 flex flex-col gap-10 justify-center items-center pb-6 px-1 bg-zinc-900 p-1 sm:p-4 lg:p-6`}>
                    <div className='flex gap-4 self-start items-center mt-4 ml-4 sm:m-0'>
                        <h3 className='text-white text-2xl font-medium'>Messages</h3>
                        <div onClick={() => toggleMsgForm(!showMsgForm)} className='bg-blue-700 p-2 w-10 flex justify-center items-center rounded-md cursor-pointer hover:bg-blue-600 transition-colors text-white'>
                            {showMsgForm ? 'x' : '+'}
                        </div>
                    </div>

                    {showMsgForm &&
                        <div className='flex flex-col sm:flex-row gap-6'>
                            <input onChange={onAddressChange} type='text' placeholder='wallet address' className={`rounded-md p-4 outline-none ${newInputWidth} bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white`} />
                            <input onChange={onMsgChange} type='text' placeholder='message' className={`rounded-md p-4 outline-none ${newInputWidth} bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white`} />
                            <button onClick={sendMessage} className={`m-auto p-4 ${newSendBtnWidth} rounded-md hover:bg-blue-800 transition-colors text-center bg-blue-700 text-white`}>Send</button>
                        </div>
                    } 

                    <Convos walletAddr={walletAddress} msgObject={msgObject} socket={socket} />
                </div>
            </Fade>
        </Modal>
    );
}