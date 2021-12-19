import { useEffect } from 'react';
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from './util/useWallet';
import NftSlider from "../NftSlider";
import { Logo } from "./util/Logo";
import { getSolPrice } from './util/getSolPrice';


const SolHub = () => {
    const { phantom, nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();

    useEffect(() => {
        (async () => {
            await getSolPrice();
        })();
    }, []);

    return (
        <div className='container min-h-screen min-w-full flex flex-col items-center pt-40 gap-40 bg-gray-900'>
            <Logo />
            <div className='text-white text-xl'>{publicKey}</div>
            {connected && <NftSlider nfts={nfts} />}
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />
        </div>
    );
}


export default SolHub;

