interface MenuConfig {
    open: boolean;
    toggleMessageModal: () => void;
    toggleSettingsModal: () => void;
    toggleMenu: () => void;
}

export const SlideMenu = (props: MenuConfig) => {
    const { toggleMessageModal, toggleSettingsModal, toggleMenu, open } = props;

    const translation: string = open ? 'translate-x-0' : 'translate-x-full';

    const display: string | undefined = open ? undefined : 'hidden';

    const menuWidth: string = 'w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12';

    return (
        <div id='slide-menu' className={`flex flex-col gap-10 pt-24 ${menuWidth} h-screen text-center p-6 absolute top-0 right-0 transition-transform transform bg-black ${translation}`}>
            <p onClick={toggleMessageModal} className='text-white'>Messages</p>
            <p onClick={toggleSettingsModal} className='text-white'>Profile</p>
            <p onClick={toggleMenu} className='text-white'>Close menu</p>
        </div>
    );
}

