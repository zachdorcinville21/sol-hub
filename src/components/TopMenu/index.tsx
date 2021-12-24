interface TopMenuProps {
    onSettingsOpen: () => void;
    onMessagesOpen: () => void;
}

const TopMenu = (props: TopMenuProps) => {
    return (
        <div className='w-2/4 flex justify-between items-center gap-10 absolute top-6 py-2'>
            <img onClick={props.onMessagesOpen} src='https://sticnuru.sirv.com/sol-hub-imgs/email.png' className='w-8 h-8 cursor-pointer hover:opacity-50' alt='messages' />
            <img onClick={props.onSettingsOpen} src='https://sticnuru.sirv.com/sol-hub-imgs/settings.png' className='w-8 h-8 cursor-pointer hover:opacity-50' alt='messages' />
        </div>
    );
}


export default TopMenu;

