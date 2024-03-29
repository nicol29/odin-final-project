import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../config/firebase-config';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom';
import schema from '../../schema/validation'
import LogInContext from '../../contexts/LogInContext';
import { doc, setDoc } from "firebase/firestore";


function SignUp () {
  const [loggedInUser, setLoggedInUser] = useContext(LogInContext);

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
      if(user){
        await setDoc(doc(db, "users", user.user.uid), {
          fullName: data.fullName,
          userName: data.userName
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onAuthStateChanged(auth, (currentUser) => {
    setLoggedInUser(currentUser);
  });

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
        <p>Have an account? {<Link to="/" style={{color: '#4596ff', textDecoration: 'none'}}>Log in</Link>}</p>
      </div>
    </div>
  )
}

export default SignUp;