import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

interface SMProps {
    open: boolean;
    walletAddress: string | null;
    handleClose: () => void;
    onSave: (username: string, email: string) => Promise<void>;
}

export const SettingsModal = ({ open, handleClose, onSave, walletAddress }: SMProps) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    const modalWidth: string = 'w-11/12 sm:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12';

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
        >
            <Fade in={open}>
                <div style={{ transform: 'translate(-50%, -50%)' }} className={`rounded-md outline-none ${modalWidth} absolute top-2/4 left-2/4 flex flex-col gap-10 justify-center items-center bg-zinc-900 p-6`}>
                    <h3 className='text-white text-2xl font-medium self-start'>Profile</h3>

                    <input onChange={onUsernameChange} type='text' placeholder='Edit username' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                    <input onChange={onEmailChange} type='text' placeholder='Email for offline notifications' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                    <button onClick={() => onSave(username, email)} className='m-auto p-4 w-40 rounded-md hover:bg-blue-800 transition-colors text-center bg-blue-700 text-white'>Save</button>
                </div>
            </Fade>
        </Modal>
    );
}

