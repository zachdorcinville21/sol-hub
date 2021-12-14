import { useState, useEffect } from 'react';
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { connectToWallet } from './util/connectToWallet';
import { Phantom } from './util/types';

declare const window: Window &
   typeof globalThis & {
     solana: any,
}

const SolHub = () => {
    const [phantom, setPhantom] = useState<Phantom | null>(null);
    const [publicKey, setKey] = useState<string | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const onConnectClick = async () => {
        const result = await connectToWallet(phantom);
        setKey(result);
    }

    const onDisconnectClick = async () => {
        await phantom?.disconnect();
        setKey(null);
    }

    useEffect(() => {
        if (window["solana"]?.isPhantom) {
            setPhantom(window["solana"]);
        }

        return () => {
            (async () => {
                phantom?.disconnect();
            })();
        }
    }, [phantom]);

    useEffect(() => {
        phantom?.on('connect', () => setConnected(true));
        phantom?.on('disconnect', () => setConnected(false));
    }, [phantom]);

    return (
        <div className='container min-h-screen min-w-full flex items-center justify-center bg-gray-800'>
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />
        </div>
    )
}

export default SolHub;

