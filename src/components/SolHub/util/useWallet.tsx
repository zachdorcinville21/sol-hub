import { useState, useEffect } from 'react';
import { connectToWallet } from '../util/connectToWallet';
import { Phantom } from './types';
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

interface WalletControls {
    nfts: Array<{ [key: string]: any }> | null;
    publicKey: string | null;
    connected: boolean;
    phantom: Phantom | null;
    onConnectClick: () => Promise<void>;
    onDisconnectClick: () => Promise<void>;
}

declare const window: Window &
    typeof globalThis & {
        solana: any,
    }

/**
 * Returns stateful information about a Phantom wallet along with functions to connect and disconnect.
 */
export const useWallet = (): WalletControls => {
    const [phantom, setPhantom] = useState<Phantom | null>(null);
    const [publicKey, setKey] = useState<string | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [nfts, setNfts] = useState<Array<{ [key: string]: any }> | null>(null);

    const onConnectClick = async () => {
        const result = await connectToWallet(phantom);
        setKey(result);

        const tokenList = await getParsedNftAccountsByOwner({ publicAddress: result });
        setNfts(tokenList);

        setConnected(true);
    }

    const onDisconnectClick = async () => {
        await phantom?.disconnect();
        setConnected(false);
        setKey(null);
    }

    useEffect(() => {
        if (window["solana"]?.isPhantom) {
            setPhantom(window["solana"]);
        }

        // return () => {
        //     (async () => {
        //         phantom?.disconnect();
        //     })();
        // }
    }, [phantom]);

    return {
        nfts,
        publicKey,
        connected,
        phantom,
        onConnectClick,
        onDisconnectClick,
    }
}


