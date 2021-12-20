import { useState, useEffect } from 'react';
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from './util/useWallet';
import NftSlider from "../NftSlider";
import { Logo } from "./util/Logo";
import { getSolPrice } from './util/getSolPrice';
import { getSolDayChange } from './util/getSolDayChange';
import Stats from './util/Stats';


const SolHub = () => {
    const [solPrice, setSolPrice] = useState<string | null>(null);
    const [solDayChange, setSolDayChange] = useState<string | null>(null);
    const { nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();

    useEffect(() => {
        (async () => {
            try {
                const data = await getSolPrice();
                setSolPrice(data.price);

                const change = await getSolDayChange();
                setSolDayChange(change.priceChangePercent);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className='container min-h-screen min-w-full flex flex-col items-center pt-40 gap-24 bg-gray-900'>
            <Logo />
            <div className='text-white text-xl'>{publicKey}</div>
            <Stats price={solPrice} change={solDayChange} />
            {connected && <NftSlider nfts={nfts} />}
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />
        </div>
    );
}


export default SolHub;

