import { PhantomLogo } from './util/index';

interface WalletBtnProps {
    onClick: () => Promise<void>;
    publicKey: string | null;
    connected: boolean;
}

export const ConnectWalletBtn = ({ onClick, publicKey, connected }: WalletBtnProps) => {
    const btnTxt = window.screen.width <= 800 ? 'Connect' : 'Connect wallet';
    const addrSliceIdx: number = window.screen.width <= 800 ? 5 : 10;

    return (
        <button onClick={onClick} className='font-noto bg-blue-800 p-3 rounded absolute top-6 right-6 text-white hover:bg-blue-900 focus:outline-none flex flex-row justify-center items-center gap-3.5 transition-colors'>
            {PhantomLogo}
            {connected ? `${publicKey?.slice(0, addrSliceIdx) ?? 'Disconnect'}...` : btnTxt}
        </button>
    );
}

