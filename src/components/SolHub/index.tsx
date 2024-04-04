import { useState, useEffect, useContext, useCallback } from "react";
import { ConnectWalletBtn } from "../ConnectWalletBtn";
import { useWallet } from "./util/useWallet";
import { Logo } from "./util/Logo";
import { getSolPrice } from "./util/getSolPrice";
import { getSolDayChange } from "./util/getSolDayChange";
import Stats from "./util/Stats";
import TopMenu from "../TopMenu";
import { SettingsModal } from "../SettingsModal";
import { MessagesModal } from "../MessagesModal";
import { useProfileData } from "../util/hooks/useProfileData";
import { useGreeting } from "../util/hooks/useGreeting";
import { SocketContext } from "../context/socket";
import { NotifUpdateConfig } from "./util/types";
import {
  ChangesSavedMsg,
  MsgSentAlert,
  NotifMsg,
  TransFailedAlert,
} from "../util/misc/Snackbars";
import { useAnimation } from "../util/hooks/useAnimation";
import gsap from "gsap";
import { TransactionModal } from "../TransactionModal";
import { useSnackbar } from "../util/hooks/useSnackbar";
import { TransSuccessAlert } from "../util/misc/Snackbars";
import { Link } from "react-router-dom";

export default function SolHub(): JSX.Element {
  const [solPrice, setSolPrice] = useState<string | null>(null);
  const [solDayChange, setSolDayChange] = useState<string | null>(null);
  const [messagesMenuOpen, toggleMessageMenu] = useState<boolean>(false);
  const [settingsMenuOpen, toggleSettingsMenu] = useState<boolean>(false);
  const [notifCount, setNotifCount] = useState<number>(0);
  const [notifMsgOpen, setNotifMessage] = useState<boolean>(false);
  const [changesSavedOpen, setChangesSaved] = useState<boolean>(false);
  const [newMsg, setNewMsg] = useState<string>("");
  const [senderWallet, setSender] = useState<string>("");
  const [menuOpen, toggleMenu] = useState<boolean>(false);
  const [msgSentOpen, setSentOpen] = useState<boolean>(false);
  const [transModalOpen, toggleTransModal] = useState<boolean>(false);

  const {
    connected,
    publicKey,
    phantom,
    solBalance,
    onConnectClick,
    onDisconnectClick,
  } = useWallet();
  const { username, onSave } = useProfileData(publicKey, connected);
  const { socket } = useContext(SocketContext);
  const { leftFadeSlide, fadeIn } = useAnimation();
  const greeting = useGreeting();

  const {
    transMsgOpen,
    closeTransMsg,
    openTransMsg,
    errorMsgOpen,
    openErrorMsg,
  } = useSnackbar();

  const openMessages = () => {
    toggleMessageMenu(true);
    toggleMenu(false);
  };
  const openSettings = () => {
    toggleSettingsMenu(true);
    toggleMenu(false);
  };

  const closeMessages = () => toggleMessageMenu(false);
  const closeSettings = () => toggleSettingsMenu(false);

  const closeNotifMsg = () => setNotifMessage(false);
  const closeSavedMsg = () => setChangesSaved(false);

  const openSentAlert = () => setSentOpen(true);
  const closeSentMsg = () => setSentOpen(false);

  const openTransactionModal = (): void => toggleTransModal(true);
  const closeTransModal = (): void => toggleTransModal(false);

  const toggleMobileMenu = () => {
    toggleMenu(!menuOpen);
  };

  const updateNewMsg = useCallback((msg: string, sender: string): void => {
    setNewMsg(msg);
    setSender(sender);
    setNotifMessage(true);
  }, []);

  const updateNotifCount = useCallback(
    (val: number, options?: NotifUpdateConfig) => {
      if (options && options.type === "set") {
        setNotifCount(val);
      } else if (options && options.type === "subtract") {
        setNotifCount((prev) => prev - val);
      } else {
        setNotifCount((prev) => prev + val);
      }
    },
    []
  );

  const handleProfileChange = async (username: string, email: string) => {
    const success = await onSave(username, email);

    if (success) {
      setChangesSaved(true);
    }
  };

  const handleDisconnect = async () => {
    console.log("disconnecting..");
    socket?.emit("walletDisconnect");
    await onDisconnectClick();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getSolPrice();
        setSolPrice(data.toString());

        const change = await getSolDayChange();
        setSolDayChange(change.toString());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!connected) {
      return;
    } else {
      socket?.emit("new-user-connected", {
        walletAddress: publicKey,
        username: username,
      });
    }
  }, [connected, socket, username, publicKey]);

  useEffect(() => {
    if (!connected) {
      gsap.delayedCall(0.5, leftFadeSlide, ["#default-greeting"]);
      gsap.delayedCall(1.8, fadeIn, ["#connect-wallet-prompt"]);
    }
    //eslint-disable-next-line
  }, [connected]);

  const welcomeFontSize: string = "text-3xl lg:text-4xl";

  return (
    <div className="container min-h-screen min-w-full flex flex-col items-center pt-32 lg:pt-28 px-4 gap-8 2xl:gap-24 bg-gray-900">
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
      <ConnectWalletBtn
        onClick={!connected ? onConnectClick : handleDisconnect}
        publicKey={publicKey}
        connected={connected}
      />

      {connected ? (
        <div
          className={
            username === null
              ? "text-white text-xl text-center font-normal font-noto"
              : "text-white text-3xl font-normal text-center font-noto"
          }
        >
          {username === null || username === ""
            ? `${publicKey?.slice(0, 12)}...`
            : `${greeting}, ${username}`}
        </div>
      ) : (
        <div className="text-center flex flex-col gap-4">
          <h1
            id="default-greeting"
            className={`text-white opacity-0 relative right-12 ${welcomeFontSize} font-normal font-noto`}
          >
            Welcome to $SOLhub. Your personal Solana dashboard.
          </h1>
          <h3
            id="connect-wallet-prompt"
            className="text-white text-lg opacity-0 font-light font-noto"
          >
            Connect wallet to get started.
          </h3>
        </div>
      )}

      <Stats
        price={solPrice}
        change={solDayChange}
        balance={solBalance}
        connected={connected}
        openTransModal={openTransactionModal}
      />
      {connected && (
        <Link to="/collectibles">
          <button className="bg-black text-white p-4 rounded-md w-40 transition-shadow hover:shadow-2xl shadow-blue-500/50">
            View collectibles
          </button>
        </Link>
      )}

      {/** Modals */}
      <SettingsModal
        open={settingsMenuOpen}
        walletAddress={publicKey}
        handleClose={closeSettings}
        onSave={handleProfileChange}
      />
      <MessagesModal
        openSentAlert={openSentAlert}
        newMsg={newMsg}
        open={messagesMenuOpen}
        walletAddress={publicKey}
        handleClose={closeMessages}
        updateNotifCount={updateNotifCount}
      />
      <TransactionModal
        open={transModalOpen}
        handleClose={closeTransModal}
        openTransMsg={openTransMsg}
        openErrorMsg={openErrorMsg}
        pubKey={publicKey}
        phantom={phantom}
      />

      {/** Alerts */}
      <NotifMsg
        open={notifMsgOpen}
        handleClose={closeNotifMsg}
        message={newMsg}
        sender={senderWallet}
      />
      <ChangesSavedMsg open={changesSavedOpen} handleClose={closeSavedMsg} />
      <MsgSentAlert open={msgSentOpen} handleClose={closeSentMsg} />
      <TransSuccessAlert open={transMsgOpen} handleClose={closeTransMsg} />
      <TransFailedAlert open={errorMsgOpen} handleClose={closeTransMsg} />
    </div>
  );
}
