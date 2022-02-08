import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HomePage} from './screens/home';
import {LoginPage} from './screens/login';
import {SignupPage} from './screens/signup';
import {FallbackPage} from './screens/fallback';
import {ProfilePage} from './screens/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="*" element={<FallbackPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
