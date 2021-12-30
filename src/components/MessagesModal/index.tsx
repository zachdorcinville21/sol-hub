import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { getConversations } from '../util/user-crud/getConversations';
import Convos from './util/Convos';

interface MMProps {
    open: boolean;
    walletAddress: string | null;
    handleClose: () => void;
}

export const MessagesModal = ({ open, handleClose, walletAddress }: MMProps) => {
    const [address, setAddress] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [msgObject, setMsgObj] = useState<{ [key: string]: any[] } | null>(null);
    const [showMsgForm, toggleMsgForm] = useState<boolean>(false);

    const { socket } = useContext(SocketContext);

    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.currentTarget.value);
    }

    const onMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.currentTarget.value);
    }

    const sendMessage = () => {
        socket?.emit('send-msg', [walletAddress, address, msg]);
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await getConversations(walletAddress!);
                setMsgObj(data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [walletAddress, socket]);

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
                <div style={{ transform: 'translate(-50%, -50%)' }} className='overflow-scroll rounded-md outline-none w-2/5 absolute top-2/4 left-2/4 flex flex-col gap-10 justify-center bg-zinc-900 p-6'>
                    <div className='flex gap-4 items-center'>
                        <h3 className='text-white text-2xl font-medium'>Messages</h3>
                        <div onClick={() => toggleMsgForm(!showMsgForm)} className='bg-blue-700 p-2 w-10 flex justify-center items-center rounded-md cursor-pointer hover:bg-blue-600 transition-colors text-white'>
                            {showMsgForm ? 'x' : '+'}
                        </div>
                    </div>

                    {showMsgForm && <div className='flex gap-6'>
                        <input onChange={onAddressChange} type='text' placeholder='wallet address' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                        <input onChange={onMsgChange} type='text' placeholder='message' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                        <button onClick={sendMessage} className='m-auto p-4 w-40 rounded-md hover:bg-blue-800 transition-colors text-center bg-blue-700 text-white'>Send</button>
                    </div>}
                    <hr></hr>

                    <Convos walletAddr={walletAddress} msgObject={msgObject} socket={socket} />
                </div>
            </Fade>
        </Modal>
    );
}