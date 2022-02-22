import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import './home.css'
import TopBar from '../components/topbar'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import { UserListComponent } from '../components/userListComponent';
import Container from '@mui/material/Container';
import {Footer} from '../components/footer';
import { TextLeftComponent } from '../components/textLeftComponent';
import { TextRightComponent } from '../components/textRightComponent';
import { getMessages } from '../actions/messageActions'
import { Typography } from '@mui/material'

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export const HomePage = () => {
    const [currentChat, setCurrentChat] = useState()
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const dispatch  = useDispatch()
    const navigate = useNavigate()

    const auth = useSelector(state=>state.login.success)
    const {users} = useSelector(state => state.usersGet)
    const {messages} = useSelector(state => state.messagesGet)

    

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    useEffect(() => {
        if(!auth)
        navigate('/')
        dispatch(getUsers())
        dispatch(getMessages(currentChat))
    }, [dispatch, currentChat,auth, navigate])
    return(
        <Box  sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }} >
            <TopBar drawerOpen={handleDrawerOpen} drawerState={open} logout={handleLogout}/>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                
                <Typography variant='h5'>
                    Users
                </Typography>
                <Divider />
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            aria-label="contacts"
                            >
                            {
                                // This check is important as the array of users might be empty and react will throw a render error
                                users && users.map(user => (
                                    <UserListComponent key={user._id} name={user.name} email = {user.email} description = {user.description} func={()=>{
                                        setCurrentChat(user._id)
                                    }}/>
                                    // <h1 key={user._id} >{user._id}</h1>
                                ))
                            }
                        </List>
                
            </Drawer>
            <Container component="main" maxWidth="xl">
                <Box sx={{ flexGrow: 1, margin:2, display:'flex'}}>
                    <Grid container spacing={2} columns={12}>
                            
                        <Grid className='noScroll' item xs={12} sx={{ maxHeight: '70vh', overflowY: 'scroll'}}>
                            <List >
                                <h1>{currentChat}</h1>
                                {
                                    messages && messages.map(message => (
                                        message.to === currentChat ? <TextLeftComponent key={message._id} message={message.message}/> : <TextRightComponent key={message._id} message={message.message}/>
                                    ))
                                }
                                
                            </List>
                        </Grid>
                    </Grid>
                </Box>
                <Footer currentChat={currentChat}/>
            </Container>
        </Box>
    )
}