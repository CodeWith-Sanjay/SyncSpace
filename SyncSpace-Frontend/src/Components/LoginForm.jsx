import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import '../styles/login.css';
import Loader from './Loader/Loader';
import { loginUser } from '../services/authServices.js';

const LoginForm = () => {

    const navigate = useNavigate();

    const [passwordShow, setPasswordShow] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleRegisterChange = (e) => {
        const {name, value} = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const validateErrors = {}

        if(!loginData.email) {
            validateErrors.email = 'Name is required'
        }

        if(!loginData.password) {
            validateErrors.password = 'Password is required'
        }

        setErrors(validateErrors)
        if(Object.keys(validateErrors).length > 0) return;

        try {
            setLoading(true);

            const res = await loginUser(loginData);

            if(res.success) {
                console.log('Logged in successfully');
                navigate('/teams')
            } else if (res.message.toLowerCase().trim().includes('user')) {
                setErrors({email: 'User not found'});
            } else if (res.message.toLowerCase().trim().includes('password')) {
                setErrors({password: 'Iccorect password'});
            } else {
                alert(res.message || 'Something went wrong')
            }

        } catch (error) {
            console.log('Error logging user: ', error.message);
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='login-container'>
        <h1>SyncSpace</h1> <hr></hr>
        <h3>We are glad to see you again!</h3>

        <form className='login-form' onSubmit={handleLoginSubmit}>

            <div className='login-input-container'>
                <label name='email'><EmailIcon className='login-icon'/></label>
                <input 
                type='email' 
                name='email' 
                placeholder='Enter Email Id' 
                onChange={handleRegisterChange}
                value={loginData.email} />
                {errors.email && <p className='login-error'>{errors.email}</p>}
            </div>

            <div className='login-input-container'>
                <label name='password'><PasswordIcon className='login-icon'/></label>
                <input 
                type={passwordShow ? 'text' : 'password'}
                name='password' 
                placeholder='Enter Password' 
                onChange={handleRegisterChange}
                value={loginData.password} />
                {passwordShow ? 
                <VisibilityIcon onClick={() => setPasswordShow(false)} className='passwordVisible-icon' /> :
                <VisibilityOffIcon onClick={() => setPasswordShow(true)} className='passwordVisible-icon' />
                }
                {errors.password && <p className='login-error'>{errors.password}</p>}
            </div>

            <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Sign In'}</button>
        </form>

        <p>Didn't have an account? <Link to='/' className='login-link'>Register</Link></p>
    </div>
  )
}

export default LoginForm
