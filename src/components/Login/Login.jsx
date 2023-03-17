import './Login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fullName: yup.string().required(),
  userName: yup.string().required(),
  password: yup.string().min(6).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [logInEmail, setLogInEmail] = useState('');
  const [logInPass, setLogInPass] = useState('');

  const onSubmit = (data) => {
    console.log(data);
  }

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
        <p>Don't have an account?</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            name="email"
            type="email" 
            placeholder="Email" 
            {...register("email")}
          />
          {errors.email?.message && <p className="invalid">{errors.email.message}</p>}
          <input 
            name="fullName"
            type="text" 
            placeholder="Full Name"
            {...register("fullName")}
          />
          {errors.fullName?.message && <p className="invalid">{errors.fullName.message}</p>}
          <input 
            name="userName"
            type="text" 
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName?.message && <p className="invalid">{errors.userName.message}</p>}
          <input 
            name="password"
            type="password" 
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && <p className="invalid">{errors.password.message}</p>}
          <input 
            name="confirmPassword"
            type="password" 
            placeholder="Re-Enter Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p className="invalid">Passwords must match!</p>}
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Login;