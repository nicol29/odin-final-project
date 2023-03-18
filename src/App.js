import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './contexts/UserContext';

function App() {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route index element={userInfo?.accessToken ? <Home /> : <Login/>}/>
        <Route path="/register" element={userInfo?.accessToken ? <Navigate to="/" /> : <SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
