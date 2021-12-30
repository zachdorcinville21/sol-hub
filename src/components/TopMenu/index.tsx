import { useState, useEffect, useContext } from "react";
import { SocketContext } from '../context/socket/index';

interface TopMenuProps {
    onSettingsOpen: () => void;
    onMessagesOpen: () => void;
}

const TopMenu = (props: TopMenuProps) => {
    const [notificationCount, setNotifCount] = useState<number>(0);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket?.on('new-message', message => {
            console.log("🚀 ~ file: index.tsx ~ line 51 ~ useEffect ~ message", message)
            setNotifCount(prev => prev + 1);
        });
    }, [socket]);

    return (
        <div className='w-2/4 flex justify-between items-center gap-10 absolute top-6 py-2'>
            <div className='relative'>
                {notificationCount > 0 &&
                    <div style={{ top: 0, left: '1.4rem'}} className='w-5 h-5 rounded-full bg-red-800 text-white flex justify-center items-center absolute'>{notificationCount}</div>
                }
                <img onClick={props.onMessagesOpen} src='https://sticnuru.sirv.com/sol-hub-imgs/email.png' className='w-8 h-8 cursor-pointer hover:opacity-50' alt='messages' />
            </div>
            <img onClick={props.onSettingsOpen} src='https://sticnuru.sirv.com/sol-hub-imgs/settings.png' className='w-8 h-8 cursor-pointer hover:opacity-50' alt='messages' />
        </div>
    );
}


export default TopMenu;

