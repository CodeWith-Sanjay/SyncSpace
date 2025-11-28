import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PortraitIcon from '@mui/icons-material/Portrait';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import '../styles/register.css';
import Loader from './Loader/Loader.jsx';
import { registerUser } from '../services/authServices.js';

const RegisterForm = () => {

    const navigate = useNavigate();

    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: null,
    });

    const handleRegisterChange = (e) => {
        const {name, value, files} = e.target;

        setRegisterData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = {}
        const emailRegexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!registerData.name) {
            validateErrors.name = 'Name is required'
        }

        if(!registerData.email) {
            validateErrors.email = 'Email is required'
        } else if(!emailRegexCode.test(registerData.email)) {
            validateErrors.email = 'Invalid email id'
        }

        if(!registerData.password) {
            validateErrors.password = 'Password is required'
        }

        if(!registerData.confirmPassword) {
            validateErrors.confirmPassword = 'Password confirmation required'
        } else if (registerData.password !== registerData.confirmPassword) {
            validateErrors.confirmPassword = 'Password is not match'
        }

        setErrors(validateErrors);
        if(Object.keys(validateErrors).length > 0) return 

        try {
            setLoading(true)

            const RegisterData = new FormData();
            RegisterData.append('name', registerData.name);
            RegisterData.append('email', registerData.email);
            RegisterData.append('password', registerData.password);
            if(registerData.profilePic) RegisterData.append('profilePic', registerData.profilePic);

            const res = await registerUser(RegisterData);

            if(res.success) {
                setLoading(false)
                console.log('Registered successfully');
                navigate('/teams')
            } else if (res.message && res.message.toLowerCase().trim().includes('email')) {
                setErrors({email: 'Email already registered'});
            } else {
                alert(res.message || 'Something went wrong')
            }
        } catch (error) {
            console.log('Error registering user: ', error.message);
        } finally {
            setLoading(false)
        }
        
    }

  return (
    <div className='register-container'>
        <h1>SyncSpace</h1> <hr></hr>
        <h3>Looks like you're new here!</h3>

        <form className='register-form' onSubmit={handleRegisterSubmit}>

            <div className='register-input-container'>
                <label name='name'><PersonIcon className='register-icon'/></label>
                <input 
                type='text' 
                name='name' 
                placeholder='Enter Name' 
                onChange={handleRegisterChange}
                value={registerData.name} />
                {errors.name && <p className='register-error'>{errors.name}</p>}
            </div>

            <div className='register-input-container'>
                <label name='email'><EmailIcon className='register-icon'/></label>
                <input 
                type='email' 
                name='email' 
                placeholder='Enter Email Id' 
                onChange={handleRegisterChange}
                value={registerData.email} />
                {errors.email && <p className='register-error'>{errors.email}</p>}
            </div>

            <div className='register-input-container'>
                <label name='password'><PasswordIcon className='register-icon'/></label>
                <input 
                type={passwordShow ? 'text' : 'password'}
                name='password' 
                placeholder='Enter Password' 
                onChange={handleRegisterChange}
                value={registerData.password} />
                {passwordShow ? 
                <VisibilityIcon onClick={() => setPasswordShow(false)} className='passwordVisible-icon' /> :
                <VisibilityOffIcon onClick={() => setPasswordShow(true)} className='passwordVisible-icon' />
                }
                {errors.password && <p className='register-error'>{errors.password}</p>}
            </div>

            <div className='register-input-container'>
                <label name='confirmPassword'><PasswordIcon className='register-icon'/></label>
                <input 
                type={confirmPasswordShow ? 'text' : 'password'} 
                name='confirmPassword' 
                placeholder='Confirm Password' 
                onChange={handleRegisterChange}
                value={registerData.confirmPassword} />
                {confirmPasswordShow ? 
                <VisibilityIcon onClick={() => setConfirmPasswordShow(false)} className='passwordVisible-icon' /> :
                <VisibilityOffIcon onClick={() => setConfirmPasswordShow(true)} className='passwordVisible-icon' />
                }
                {errors.confirmPassword && <p className='register-error'>{errors.confirmPassword}</p>}
            </div>

            <div className='register-input-container'>
                <label name='profilePic'><PortraitIcon className='register-icon'/></label>
                <input 
                type='file' 
                name='profilePic' 
                placeholder='Choose Profile Pic' 
                onChange={handleRegisterChange}
                // value={registerData.profilePic} 
                />
            </div>

            <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Sign Up'}</button>
        </form>

        <p>Already have an account? <Link to='/login' className='register-link'>Log In</Link></p>
    </div>
  )
}

export default RegisterForm