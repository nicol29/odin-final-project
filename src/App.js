import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import LogInContext from './contexts/LogInContext';
import UserDataContext from './contexts/UserDataContext';
import Profile from './components/Profile/Profile';

function App() {
  const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
  const [userData, setUserData] = useContext(UserDataContext);

  return (
    <div className="App">
      <Routes>
        <Route index element={loggedInUser?.accessToken ? <Home /> : <Login/>}/>
        <Route path="/register" element={loggedInUser?.accessToken ? <Navigate to="/" /> : <SignUp/>}/>
        <Route path={`/${userData?.userName}`} element={<Profile />}/>
      </Routes>
    </div>
  );
}

export default App;
