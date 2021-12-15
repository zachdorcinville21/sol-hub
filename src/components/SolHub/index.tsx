import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from './util/useWallet';
import NftSlider from "../NftSlider";
import { Logo } from "./util/Logo";


const SolHub = () => {
    const { nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();

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

