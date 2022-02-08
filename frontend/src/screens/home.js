import React from 'react'
import TopBar from '../components/topbar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { UserListComponent } from '../components/userListComponent';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import {Footer} from '../components/footer';

export const HomePage = () => {
    return(
        <Box  sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }} >
            <TopBar/>
            
            <Container component="main" maxWidth="xl">
                <Box sx={{ flexGrow: 1, margin:2, display:'flex'}}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={5}>
                            
                            <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            aria-label="contacts"
                            >
                            
                            <UserListComponent name="Aritra Stark"/>
                            <UserListComponent name="Aritra Stark"/>
                            </List>
                        </Grid>
                            
                        <Grid item xs={7}>
                        xs=8
                        </Grid>
                    </Grid>
                </Box>
                <Footer/>
            </Container>
        </Box>
    )
}