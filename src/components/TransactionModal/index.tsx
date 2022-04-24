import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TransactionClient from '../util/types/TransactionClient';
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import { Phantom } from '../SolHub/util/types';

interface TMProps {
    open: boolean;
    pubKey: string | null;
    phantom: Phantom | null;
    handleClose: () => void;
    openTransMsg: () => void;
    openErrorMsg: () => void;
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export const TransactionModal = (props: TMProps): JSX.Element => {
    const [processingTransaction, toggleProcessing] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const [receiverAddress, setReceiverAddress] = useState<string>("");

    const { open, pubKey, phantom, handleClose, openTransMsg, openErrorMsg } = props;

    const tc = new TransactionClient(pubKey, phantom);

    const modalWidth: string = 'w-11/12 sm:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12';

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAmount(parseFloat(e.target.value));
    }

    const onReceiverAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setReceiverAddress(e.target.value);
    }

    async function onSend(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        toggleProcessing(true);

        const sig = await tc.send(receiverAddress, amount);

        if (sig !== null) {
            toggleProcessing(false);
            openTransMsg();
        } else {
            toggleProcessing(false);
            openErrorMsg();
        }
    }

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
                    <h3 className='text-white text-2xl font-medium font-noto self-start'>Send Solana</h3>

                    <form onSubmit={onSend} className='flex flex-col gap-10 justify-center items-center'>
                        <input required onChange={onReceiverAddressChange} type='text' placeholder='SOL address' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                        <input required onChange={onAmountChange} type='number' step="any" placeholder='Amount' className='rounded-md p-4 outline-none w-80 bg-zinc-900 border border-gray-600 placeholder-gray-600 text-white' />
                        <button type='submit' className='m-auto p-4 w-40 font-noto rounded-md hover:bg-blue-800 transition-colors flex justify-center items-center bg-blue-700 text-white'>
                            {processingTransaction && <RingLoader color="#fff" size={25} css={override} loading />}
                            {!processingTransaction && "Send"}
                        </button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}