import { useState } from 'react';

interface SnackbarControls {
    transMsgOpen: boolean;
    errorMsgOpen: boolean;
    closeTransMsg: () => void;
    openTransMsg: () => void;
    openErrorMsg: () => void;
    closeErrorMsg: () => void;
}

export function useSnackbar(): SnackbarControls {
    const [transMsgOpen, toggleTransMsg] = useState<boolean>(false);
    const [errorMsgOpen, toggleErrorMsg] = useState<boolean>(false);

    const openTransMsg = () => toggleTransMsg(true);
    const closeTransMsg = () => toggleTransMsg(false);

    const openErrorMsg = () => {
        toggleErrorMsg(true);
        setTimeout(() => {
            toggleErrorMsg(false);
        }, 3000);
    }
    const closeErrorMsg = () => toggleErrorMsg(false);

    return {
        transMsgOpen,
        errorMsgOpen,
        closeTransMsg,
        openTransMsg,
        openErrorMsg,
        closeErrorMsg,
    };
}
