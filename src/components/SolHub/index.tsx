import { useState, useEffect } from 'react';
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from './util/useWallet';
import NftSlider from "../NftSlider";
import { Logo } from "./util/Logo";
import { getSolPrice } from './util/getSolPrice';
import { getSolDayChange } from './util/getSolDayChange';
import Stats from './util/Stats';
import TopMenu from '../TopMenu';
import { SettingsModal } from '../SettingsModal';
import { updateUsername } from '../util/user-crud/updateUsername';
import { getUsername } from '../util/user-crud/getUsername';
import { useProfileData } from '../util/hooks/useProfileData';
import { useGreeting } from '../util/hooks/useGreeting';


const SolHub = () => {
    const [solPrice, setSolPrice] = useState<string | null>(null);
    const [solDayChange, setSolDayChange] = useState<string | null>(null);
    const [messagesMenuOpen, toggleMessageMenu] = useState<boolean>(false);
    const [settingsMenuOpen, toggleSettingsMenu] = useState<boolean>(false);

    const { nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();
    const { username, onSave } = useProfileData(publicKey, connected);
    const greeting = useGreeting();

    const openMessages = () => toggleMessageMenu(true);
    const openSettings = () => toggleSettingsMenu(true);

    const closeMessages = () => toggleMessageMenu(false);
    const closeSettings = () => toggleSettingsMenu(false);

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
            <TopMenu onMessagesOpen={openMessages} onSettingsOpen={openSettings} />
            <div className={username === null ? 'text-white text-xl' : 'text-white text-3xl font-medium'}>
                {username === null || username === '' ? publicKey : `${greeting}, ${username}`}
            </div>
            <Stats price={solPrice} change={solDayChange} />
            {connected && <NftSlider nfts={nfts} />}
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />

            <SettingsModal open={settingsMenuOpen} walletAddress={publicKey} handleClose={closeSettings} onSave={onSave} />
        </div>
    );
}


export default SolHub;

