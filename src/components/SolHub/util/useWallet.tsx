import { useState, useEffect, useCallback } from 'react';
import { connectToWallet } from '../util/connectToWallet';
import { createUser } from './createUser';
import { Phantom } from './types';
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import * as solanaWeb3 from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getPhantomProvider } from './getPhantomProvider';

interface WalletControls {
    nfts: Array<{ [key: string]: any }> | null;
    publicKey: string | null;
    connected: boolean;
    phantom: Phantom | null;
    solBalance: number | null;
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
export function useWallet(): WalletControls {
    const [phantom, setPhantom] = useState<Phantom | null>(null);
    const [publicKey, setKey] = useState<string | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [solBalance, setSolBalance] = useState<number | null>(null);
    const [nfts, setNfts] = useState<Array<{ [key: string]: any }> | null>(null);

    const onConnectClick = async () => {
        const phantomProvider = getPhantomProvider();

        if (phantomProvider === null) {
            window.open('https://phantom.app/', '_blank');
        } else {
            setPhantom(phantomProvider);

            const result = await connectToWallet(phantomProvider);
            setKey(result);

            const tokenList = await getParsedNftAccountsByOwner({ publicAddress: result });
            setNfts(tokenList);

            let createUserStatus = null;

            if (result !== null) createUserStatus = await createUser(result);

            if (createUserStatus === 'OK') {
                setConnected(true);
            }
        }
    };

    const onDisconnectClick = useCallback(async () => {
        await phantom?.disconnect();
        setConnected(false);
        setKey(null);
    }, [phantom]);

    useEffect(() => {
        if (publicKey !== null && phantom !== null) {
            const key = phantom?.publicKey.toString();
            const pk = new solanaWeb3.PublicKey(key);

            (async () => {
                const connection = new solanaWeb3.Connection(
                    solanaWeb3.clusterApiUrl('mainnet-beta'),
                    'confirmed',
                );

                if (pk !== null) {
                    const balance = await connection.getBalance(pk);
                    setSolBalance(balance / LAMPORTS_PER_SOL);
                }
            })();
        }
    }, [phantom, publicKey]);

    return {
        nfts,
        publicKey,
        connected,
        phantom,
        solBalance,
        onConnectClick,
        onDisconnectClick,
    }
}


