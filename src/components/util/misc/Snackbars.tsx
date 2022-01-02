import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { makeStyles } from "@material-ui/core/styles";

interface SnackbarProps {
    open: boolean;
    message: string;
    sender: string
    handleClose: () => void;
}

const styles = makeStyles({
	notifMsg: {
		backgroundColor: "black",
	},
});

export const NotifMsg = ({ open, message, sender,  handleClose }: SnackbarProps) => {
    const classes = styles();

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message={`${sender}: ${message}`}
            classes={{ root: classes.notifMsg }}
            autoHideDuration={8000}
        />
    );
}

