import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';

export const BroadcastForm = (props) => {
    const [text, setText] = React.useState("");
    const {name} = useSelector(state=>state.login.userDetails)

    const handleBroadSend = () => {
        props.socket.current.emit('sendBroadcast', {
            from:name,
            text:text
        })
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Broadcast :</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Message"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={text}
                    onChange={(e)=>{setText(e.target.value)}}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    props.handleBroadFormClose()
                    setText("")
                }}>Cancel</Button>
                <Button onClick={()=>{
                    handleBroadSend()
                    props.handleBroadFormClose()
                }}>Send</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}