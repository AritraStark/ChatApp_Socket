import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Broadcast =(props) => {
    const vertical = 'top';
    const horizontal = 'center';

    
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={props.open}
                onClose={props.handleBroadClose}
                key={vertical + horizontal}
            >
                <Alert onClose={props.handleBroadClose}  severity="info">INCOMING BROADCAST from {props.name} : {props.text}</Alert>
            </Snackbar>

        </div>
    )
}