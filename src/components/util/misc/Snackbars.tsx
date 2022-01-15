import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

interface SnackbarProps {
    open: boolean;
    handleClose: () => void;
}

interface NotifMsgProps extends SnackbarProps {
    message: string;
    sender: string
}

const styles = makeStyles({
    notifMsg: {
        backgroundColor: "black",
        color: 'steelblue',
    },
});

export const NotifMsg = ({ open, message, sender, handleClose }: NotifMsgProps) => {
    const classes = styles();

    const msg: JSX.Element = (
        <div className='text-white'>
            <span className='text-blue-400 mr-1'>{`${sender.slice(0, 10)}...:`}</span>
            {message}
        </div>
    )

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message={msg}
            classes={{ root: classes.notifMsg }}
            autoHideDuration={8000}
        />
    );
}

export const ChangesSavedMsg = ({ open, handleClose }: SnackbarProps) => {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity='success' variant='filled'>
                Changes saved
            </Alert>
        </Snackbar>
    );
}

export const MsgSentAlert = ({ open, handleClose }: SnackbarProps) => {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity='success' variant='filled'>
                Message sent. A conversation will appear when they reply.
            </Alert>
        </Snackbar>
    );
}

