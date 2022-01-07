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
import { ChangesSavedMsg, NotifMsg } from '../util/misc/Snackbars';
import { useAnimation } from '../util/hooks/useAnimation';
import gsap from 'gsap';


const SolHub = () => {
    const [solPrice, setSolPrice] = useState<string | null>(null);
    const [solDayChange, setSolDayChange] = useState<string | null>(null);
    const [messagesMenuOpen, toggleMessageMenu] = useState<boolean>(false);
    const [settingsMenuOpen, toggleSettingsMenu] = useState<boolean>(false);
    const [notifCount, setNotifCount] = useState<number>(0);
    const [notifMsgOpen, setNotifMessage] = useState<boolean>(false);
    const [changesSavedOpen, setChangesSaved] = useState<boolean>(false);
    const [newMsg, setNewMsg] = useState<string>('');
    const [senderWallet, setSender] = useState<string>('');
    const [menuOpen, toggleMenu] = useState<boolean>(false);

    const { nfts, connected, publicKey, onConnectClick, onDisconnectClick } = useWallet();
    const { username, onSave } = useProfileData(publicKey, connected);
    const { socket } = useContext(SocketContext);
    const { leftFadeSlide, fadeIn } = useAnimation();
    const greeting = useGreeting();

    const openMessages = () => {
        toggleMessageMenu(true);
        toggleMenu(false);
    }
    const openSettings = () => {
        toggleSettingsMenu(true);
        toggleMenu(false);
    }

    const closeMessages = () => toggleMessageMenu(false);
    const closeSettings = () => toggleSettingsMenu(false);

    const closeNotifMsg = () => setNotifMessage(false);
    const closeSavedMsg = () => setChangesSaved(false);

    const toggleMobileMenu = () => {
        toggleMenu(!menuOpen);
    }

    const updateNewMsg = (msg: string, sender: string): void => {
        setNewMsg(msg);
        setSender(sender);
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

    const handleProfileChange = async (username: string, email: string) => {
        const success = await onSave(username, email);

        if (success) {
            setChangesSaved(true);
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
        } else {
            gsap.delayedCall(0.5, leftFadeSlide, ['#default-greeting']);
            gsap.delayedCall(1.8, fadeIn, ['#connect-wallet-prompt']);
        }

        return () => {
            socket?.disconnect();
        }
        // eslint-disable-next-line
    }, [connected]);

    const welcomeFontSize: string = 'text-2xl lg:text-3xl';

    return (
        <div className='container min-h-screen min-w-full flex flex-col items-center pt-40 px-4 gap-16 2xl:gap-24 bg-gray-900'>
            <Logo />
            <TopMenu
                updateNewMsg={updateNewMsg}
                onMessagesOpen={openMessages}
                onSettingsOpen={openSettings}
                notifCount={notifCount}
                updateNotifCount={updateNotifCount}
                connected={connected}
                onMenuClick={toggleMobileMenu}
            />
            {connected && <div className={username === null ? 'text-white text-xl' : 'text-white text-3xl font-medium'}>
                {username === null || username === '' ? publicKey : `${greeting}, ${username}`}
            </div>}
            {!connected && <div className='text-center flex flex-col gap-4'>
                <div id='default-greeting' className={`text-white opacity-0 relative right-12 ${welcomeFontSize} font-medium`}>Welcome to $SOLhub. Your personal dashboard on Solana.</div>
                <h3 id='connect-wallet-prompt' className='text-white opacity-0 font-medium'>Connect wallet to log in.</h3>
            </div>}
            <Stats price={solPrice} change={solDayChange} />
            {connected && <NftSlider nfts={nfts} />}
            <ConnectWalletBtn onClick={!connected ? onConnectClick : onDisconnectClick} publicKey={publicKey} connected={connected} />

            <SettingsModal open={settingsMenuOpen} walletAddress={publicKey} handleClose={closeSettings} onSave={handleProfileChange} />
            <MessagesModal open={messagesMenuOpen} walletAddress={publicKey} handleClose={closeMessages} updateNotifCount={updateNotifCount} />
            <NotifMsg open={notifMsgOpen} handleClose={closeNotifMsg} message={newMsg} sender={senderWallet} />
            <ChangesSavedMsg open={changesSavedOpen} handleClose={closeSavedMsg}/>
            {/* <SlideMenu toggleMenu={toggleMobileMenu} open={menuOpen} toggleMessageModal={openMessages} toggleSettingsModal={openSettings} /> */}
        </div>
    );
}


export default SolHub;

