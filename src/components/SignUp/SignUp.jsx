import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../schema/validation'


function SignUp () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      console.log(user);
      console.log(auth);
    } catch (error) {
      
    }
  }

  return (
    <div className='centre-login'>
      <div className="login-container">
        <h1>InstaPic</h1>
        <p className='to-see'>Sign up to see pics from your friends.</p>
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
      <div className="login-container">
        <p>Have an account? <a href='#'>Log in</a></p>
      </div>
    </div>
  )
}

export default SignUp;