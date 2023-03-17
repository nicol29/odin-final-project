import './Login.css';
import { useState } from 'react';

function Login () {
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPass, setLogInPass] = useState('');

  return (
    <div className='centre-login'>
      <div className="login-container">
        <h1>InstaPic</h1>
        <form>
          <input 
            name="loginemail"
            type="email" 
            placeholder="Email"
          />
          <input 
            name="loginpassword"
            type="password" 
            placeholder="Password"
          />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="login-container">
        <p>Don't have an account? <a href='#'>Sign up</a></p>
      </div>
    </div>
  )
}

export default Login;