import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

import '../styles/login.css';

const LoginForm = () => {

    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleRegisterChange = (e) => {
        const {name, value} = e.target;
    }
  return (
    <div className='login-container'>
        <h1>SyncSpace</h1> <hr></hr>
        <h3>We are glad to see you again!</h3>

        <form className='login-form'>

            <div className='login-input-container'>
                <label name='email'><EmailIcon className='login-icon'/></label>
                <input 
                type='email' 
                name='email' 
                placeholder='Enter Email Id' 
                onChange={handleRegisterChange}
                value={loginData.email} />
            </div>

            <div className='login-input-container'>
                <label name='password'><PasswordIcon className='login-icon'/></label>
                <input 
                type='password' 
                name='password' 
                placeholder='Enter Password' 
                onChange={handleRegisterChange}
                value={loginData.password} />
            </div>

            <button type='submit'>Sign Up</button>
        </form>

        <p>Didn't have an account? <Link to='/' className='login-link'>login</Link></p>
    </div>
  )
}

export default LoginForm
