import { useState, useEffect, useContext } from 'react';
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from './util/useWallet';
import NftSlider from "../NftSlider";
import { Logo } from "./util/Logo";
import { getSolPrice } from './util/getSolPrice';
import { getSolDayChange } from './util/getSolDayChange';
import Stats from './util/Stats';
import TopMenu from '../TopMenu';
import { SettingsModal } from '../SettingsModal';
import { MessagesModal } from '../MessagesModal';
import { useProfileData } from '../util/hooks/useProfileData';
import { useGreeting } from '../util/hooks/useGreeting';
import { SocketContext } from '../context/socket';
import { NotifUpdateConfig } from './util/types';
import { NotifMsg } from '../util/misc/Snackbars';


const SolHub = () => {
    const [solPrice, setSolPrice] = useState<string | null>(null);
    const [solDayChange, setSolDayChange] = useState<string | null>(null);
    const [messagesMenuOpen, toggleMessageMenu] = useState<boolean>(false);
    const [settingsMenuOpen, toggleSettingsMenu] = useState<boolean>(false);
    const [notifCount, setNotifCount] = useState<number>(0);
    const [notifMsgOpen, setNotifMessage] = useState<boolean>(false);
    const [newMsg, setNewMsg] = useState<string>('');

    const { nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();
    const { username, onSave } = useProfileData(publicKey, connected);
    const { socket } = useContext(SocketContext);
    const greeting = useGreeting();

    const openMessages = () => toggleMessageMenu(true);
    const openSettings = () => toggleSettingsMenu(true);

    const closeMessages = () => toggleMessageMenu(false);
    const closeSettings = () => toggleSettingsMenu(false);

    const closeNotifMsg = () => setNotifMessage(false);

    const updateNewMsg = (msg: string): void => {
        setNewMsg(msg);
        setNotifMessage(true);
    }

    const updateNotifCount = (val: number, options?: NotifUpdateConfig) => {
        if (options && options.type === 'set') {
            setNotifCount(val);
        } else if (options && options.type === 'subtract') {
            setNotifCount(prev => prev - val);
        } else {
            setNotifCount(prev => prev + val);
        }
    }

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

    useEffect(() => {
        if (connected) {
            socket?.emit('new-user-connected', [publicKey, username]);
        }

        return () => {
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [connected]);

    return (
        <div className='container min-h-screen min-w-full flex flex-col items-center pt-40 gap-24 bg-gray-900'>
            <Logo />
            <TopMenu updateNewMsg={updateNewMsg} onMessagesOpen={openMessages} onSettingsOpen={openSettings} notifCount={notifCount} updateNotifCount={updateNotifCount} />
            <div className={username === null ? 'text-white text-xl' : 'text-white text-3xl font-medium'}>
                {username === null || username === '' ? publicKey : `${greeting}, ${username}`}
            </div>
            <Stats price={solPrice} change={solDayChange} />
            {connected && <NftSlider nfts={nfts} />}
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />

            <SettingsModal open={settingsMenuOpen} walletAddress={publicKey} handleClose={closeSettings} onSave={onSave} />
            <MessagesModal open={messagesMenuOpen} walletAddress={publicKey} handleClose={closeMessages} updateNotifCount={updateNotifCount} />
            {/* <NotifMsg open={notifMsgOpen} handleClose={closeNotifMsg} message={newMsg} /> */}
        </div>
    );
}


export default SolHub;

