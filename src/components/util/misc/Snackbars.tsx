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
	},
});

export const NotifMsg = ({ open, message, sender, handleClose }: NotifMsgProps) => {
    const classes = styles();

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message={`${sender.slice(0, 10)}...: ${message}`}
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

