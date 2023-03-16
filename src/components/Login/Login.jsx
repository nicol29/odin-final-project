import './Login.css';

function Login () {
  return (
    <div className='centre-login'>
      <div className="login-container">
        <h1>InstaPic</h1>
        <form>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button type="submit">Log In</button>
        </form>
        <p>Don't have an account? <a href="#">Sign Up</a></p>
      </div>
      {/* <div className="login-container">
        <h1>InstaPic</h1>
        <form>
          <input type="email" placeholder="Email"></input>
          <input type="text" placeholder="Full Name"></input>
          <input type="text" placeholder="Username"></input>
          <input type="password" placeholder="Password"></input>
          <button type="submit">Sign Up</button>
        </form>
        <p>Don't have an account? <a href="#">Sign Up</a></p>
      </div> */}
    </div>
  )
}

export default Login;