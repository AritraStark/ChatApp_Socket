import React, { useEffect, useState, useRef } from 'react'
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
import { Footer } from '../components/footer';
import { TextLeftComponent } from '../components/textLeftComponent';
import { TextRightComponent } from '../components/textRightComponent';
import { getMessages } from '../actions/messageActions'
import { Typography } from '@mui/material'
import { fireStore } from '../firebase/config'
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {io} from 'socket.io-client'
import { Broadcast } from '../components/broadcast'
import { BroadcastForm } from '../components/broadcastForm'

const drawerWidth = 240;
const ENDPOINT = "https://starkchatsocket.herokuapp.com/"

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
    const [open, setOpen] = useState(false)
    const [bmsg, setBmsg] = useState(null)
    const [showB, setShowB] = useState(false)
    const [showBF, setShowBF] = useState(false)
    
    const messagesRef = fireStore.collection('messages');
    const socket = useRef()
    const scrollRef = useRef();

    const theme = useTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query);
    const auth = useSelector(state => state.login.success)
    // const auth = true
    const { users } = useSelector(state => state.usersGet)
    //const { messages } = useSelector(state => state.messagesGet)
    const fromID = useSelector(state => state.login.userDetails._id)

    //setMsgs(messages)

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

    const handleBroadClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowB(false);
        setBmsg(null)
    };

    const handleBroadFormClose = () => {
        setShowBF(false)
    }

    const handleBroadFormOpen = () => {
        setShowBF(true)
    }    
    //this is for the socket get message and initial connection
    useEffect(() => {
        socket.current = io.connect(ENDPOINT)

        //this is for updating broadcast message upon getting broadcast from socket
        socket.current.on('getBroadcast', (data) => {
            setBmsg({
                from: data.from,
                text: data.text,
            })
            setShowB(true)
        })
    }, [])

    //this is for the non socket redux actions
    useEffect(() => {
        //If someone tries to navigate to home without logging in redirect them to login page
        if (!auth)
            navigate('/')
        dispatch(getUsers())
        dispatch(getMessages(currentChat))
        //handleIncomingMessages(messages)
    }, [ dispatch, navigate, currentChat, auth ])
    


    //this is for sending user details upon new socket connection
    useEffect(() => {
        socket.current.emit("addUser", fromID);
      }, [fromID]);

    //this is for scrolling latest message into focus
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }} >
            <TopBar drawerOpen={handleDrawerOpen} drawerState={open} logout={handleLogout} handleBroadFormOpen={handleBroadFormOpen}/>
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
                            <UserListComponent key={user._id} name={user.name} email={user.email} description={user.description} func={() => {
                                setCurrentChat(user._id)
                            }} />

                        ))
                    }
                </List>

            </Drawer>
            <Container component="main" maxWidth="xl">
                <Box sx={{ flexGrow: 1, margin: 2, display: 'flex' }}>
                    <Grid container spacing={2} columns={12}>

                        <Grid className='noScroll' item xs={12} sx={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                            <List >
                            {
                                showB && <Broadcast open={showB} handleBroadClose={handleBroadClose} name={bmsg.from} text={bmsg.text}/>
                            }

                            {
                                showBF && <BroadcastForm open={showBF} handleBroadFormClose={handleBroadFormClose} socket={socket}/>
                            }
                                {
                                    messages && messages.map((m) => {
                                        if(m.to === currentChat && m.from === fromID) return <TextLeftComponent key={m._id} message={m.text} /> 
                                        else if(m.to === fromID && m.from === currentChat) return <TextRightComponent key={m._id} message={m.text}/>
                                        else return null
                                    })
                                }
                                {/* {
                                    msgs && msgs.map((m) => {
                                        if(m.to === currentChat && m.from === fromID) return <TextLeftComponent key={m._id} message={m.message} /> 
                                        else if(m.to === fromID && m.from === currentChat) return <TextRightComponent key={m._id} message={m.message}/>
                                        else return null
                                    })
                                } */}
                                <div ref={scrollRef}/>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
                <Footer currentChat={currentChat} socket={socket} messagesRef={messagesRef}/>
            </Container>
        </Box>
    )
}