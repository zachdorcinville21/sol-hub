import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../context/socket/index";
import { NotifUpdateConfig } from "../SolHub/util/types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useScreenSize } from "../util/hooks/useScreenSize";

interface TopMenuProps {
  onSettingsOpen: () => void;
  onMessagesOpen: () => void;
  notifCount: number;
  connected: boolean;
  updateNotifCount: (val: number, options?: NotifUpdateConfig) => void;
  updateNewMsg: (msg: string, sender: string) => void;
  onMenuClick: () => void;
}

const useMenuStyles = makeStyles({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#000000",
      color: "#fff",
    },
  },
});

const TopMenu = (props: TopMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { socket } = useContext(SocketContext);
  const { updateNotifCount, updateNewMsg, connected } = props;
  const { screenWidth } = useScreenSize();

  const menuOpen = Boolean(anchorEl);

  const handleMsgsClick = () => {
    if (props.notifCount > 0) {
      updateNotifCount(0, { type: "set" });
    }
    props.onMessagesOpen();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onMessagesClick = () => {
    props.onMessagesOpen();
    setAnchorEl(null);
  };

  const onProfileClick = () => {
    props.onSettingsOpen();
    setAnchorEl(null);
  };

  useEffect(() => {
    socket?.on("new-message", ({ message, senderWalletAddress }) => {
      updateNotifCount(1);
      updateNewMsg(message, senderWalletAddress);
    });
  }, [socket, updateNotifCount, updateNewMsg]);

  const menuButtonStyle: string = !connected
    ? "w-8 h-8 cursor-pointer opacity-50 pointer-events-none"
    : "w-8 h-8 cursor-pointer hover:opacity-50";

  const menuClasses = useMenuStyles();

  return (
    <div className="w-2/4 flex justify-between items-center gap-10 absolute top-6 py-2">
      {screenWidth >= 1440 && (
        <>
          <div className="relative">
            {props.notifCount > 0 && (
              <div
                style={{ top: 0, left: "1.4rem" }}
                className="w-5 h-5 rounded-full bg-red-800 text-white flex justify-center items-center absolute"
              >
                {props.notifCount}
              </div>
            )}
            <img
              onClick={handleMsgsClick}
              src="https://sticnuru.sirv.com/sol-hub-imgs/email.png"
              className={menuButtonStyle}
              alt="messages"
            />
          </div>
          <img
            onClick={props.onSettingsOpen}
            src="https://sticnuru.sirv.com/sol-hub-imgs/account.png"
            className={menuButtonStyle}
            alt="messages"
          />
        </>
      )}

      {screenWidth < 1440 && (
        <img
          onClick={handleMenuClick}
          className={`${menuButtonStyle} m-auto`}
          src="https://sticnuru.sirv.com/sol-hub-imgs/option.png"
          alt="menu-button"
        />
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className={menuClasses.menu}
      >
        <MenuItem onClick={onMessagesClick}>Messages</MenuItem>
        <MenuItem onClick={onProfileClick}>Profile</MenuItem>
      </Menu>
    </div>
  );
};

export default TopMenu;
