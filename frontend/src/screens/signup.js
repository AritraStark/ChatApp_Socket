import * as React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../actions/userActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from '../components/copyright';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [description, setDescription] = useState()
  const [password, setPassword] = useState()
  const [open, setOpen] = useState(false);

  const {success,userDetails} = useSelector(state=>state.signup)

  function handleSignupClick(e) {
      e.preventDefault()
      dispatch(signup(name,email,description,password))
      setTimeout(()=>setOpen(true),1500)
  }

  const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
  };

  // useEffect(()=>{
  //   if(success||userDetails.user)
  //     navigate('/home')
  // },[success,navigate,userDetails])
    
      return (

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSignupClick} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="About Me"
                      name="description"
                      autoComplete="description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link variant="body2" onClick={()=>{navigate('/')}}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                      <Snackbar open={open} autoHideDuration={8000} onClose={handleAlertClose}>
                            {success===true?<Alert onClose={handleAlertClose} severity="success">
                                Signup Successful, Login <Link href='/home'>here</Link>
                            </Alert>:<Alert onClose={handleAlertClose} severity="error">
                                Signup Unsuccessful
                            </Alert>}
                            
                        </Snackbar>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
      );
}