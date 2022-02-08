import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomePage} from './screens/home';
import {LoginPage} from './screens/login';
import {SignupPage} from './screens/signup';
import {FallbackPage} from './screens/fallback';
import {ProfilePage} from './screens/profile';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00906b',
    },
    secondary: {
      main: '#78f500',
    },
  },
  typography: {
    fontFamily: 'Unica One',
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="*" element={<FallbackPage/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
