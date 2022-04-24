import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import * as solanaWeb3 from '@solana/web3.js';
import { useState, createContext, useEffect, useCallback } from "react";
import { connectToWallet } from "../../components/SolHub/util/connectToWallet";
import { createUser } from "../../components/SolHub/util/createUser";
import { getPhantomProvider } from "../../components/SolHub/util/getPhantomProvider";
import { Phantom } from "../../components/SolHub/util/types";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletProviderProps {
    children: React.ReactNode;
}

const walletDefault: WalletControls = {
    nfts: [],
    publicKey: "",
    connected: false,
    phantom: null,
    solBalance: 0,
    onConnectClick: async () => {},
    onDisconnectClick: async () => {}
}

export const WalletContext = createContext<WalletControls>(walletDefault);

export default function WalletProvider({ children }: WalletProviderProps): JSX.Element {
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
                    setSolBalance(Math.round((balance / LAMPORTS_PER_SOL) * 1000) / 1000);
                }
            })();
        }
    }, [phantom, publicKey]);

    const walletInfo: WalletControls = {
        nfts,
        publicKey,
        connected,
        phantom,
        solBalance,
        onConnectClick,
        onDisconnectClick,
    }

    return (
        <WalletContext.Provider value={walletInfo}>
            {children}
        </WalletContext.Provider>
    );
}