import './Login.css';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import UserContext from '../../contexts/UserContext';

function Login () {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPass, setLogInPass] = useState('');

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        logInEmail,
        logInPass
      );

      setLogInEmail('');
      setLogInPass('')
    } catch (error) {
      console.log(error);
    }
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });

  return (
    <div className='centre-login'>
      <div className="login-container">
        <h1>InstaPic</h1>
        <form onSubmit={(e) => logIn(e)}>
          <input 
            value={logInEmail}
            name="loginemail"
            type="email" 
            placeholder="Email"
            onChange={(e) => setLogInEmail(e.target.value)}
          />
          <input 
            value={logInPass}
            name="loginpassword"
            type="password" 
            placeholder="Password"
            onChange={(e) => setLogInPass(e.target.value)}
          />
          <button>Log In</button>
        </form>
      </div>
      <div className="login-container">
        <p>Don't have an account? {<Link to="/register" style={{color: '#4596ff', textDecoration: 'none'}}>Sign up</Link>}</p>
      </div>
    </div>
  )
}

export default Login;