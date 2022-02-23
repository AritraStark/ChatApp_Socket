import React from 'react'
import TopBar from '../components/topbar'
import ReportIcon from '@mui/icons-material/Report';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';

export const FallbackPage = () => {
    return(
        <div>
            <TopBar/>
            <Box 
            sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 10,
          width: 400,
          height: 200,
        },
      }}>
                <Paper
                    sx={{
                        padding: '2rem',
                        justifyContent: 'center',
                    }}
                >
                    <ReportIcon color='error' fontSize='large'/>
                    <Typography variant="h5" component="h2" padding='2rem'>
                    ERROR 404: NOT FOUND
                    </Typography>
                    <Fab variant="extended">
                        
                        <HomeIcon sx={{ mr: 1 }} />
                        Return Home
                    </Fab>
                </Paper>
            </Box>
        </div>
    )
}