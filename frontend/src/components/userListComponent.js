import* as React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

export const UserListComponent = (props) => {
    return (
        <div>
                        <ListItem>
                            <ListItemButton>
                            <ListItemIcon>
                                <Avatar sx={{ bgcolor: 'secondary' }}>{props.name[0]}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={props.name} />
                            </ListItemButton>
                            
                        </ListItem>
                        <Divider variant="fullwidth" component="li" />
        </div>
    )
}