import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { UserListComponent } from '../components/userListComponent';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = () => {
  return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Grid container spacing={2} columns={12}>
                        <Grid item xs={5}>
                            
                        
                        </Grid>
                            
                        <Grid item xs={7} display='flex' justifyContent='space-between'>

                            <TextField fullWidth id="outlined-basic" label="Send Message" variant="outlined" />
                            <Fab color="primary" aria-label="add" size='medium' sx={{marginLeft:1}}>
                                <SendIcon />
                            </Fab>
                        </Grid>
        </Grid>
      </Box>
  );
}