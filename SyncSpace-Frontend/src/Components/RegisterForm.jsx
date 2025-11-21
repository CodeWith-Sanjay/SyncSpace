import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PortraitIcon from '@mui/icons-material/Portrait';

import '../styles/register.css';

const RegisterForm = () => {

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: '',
    });

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
    }

  return (
    <div className='register-container'>
        <h1>SyncSpace</h1> <hr></hr>
        <h3>Looks like you're new here!</h3>

        <form className='register-form'>

            <div className='register-input-container'>
                <label name='name'><PersonIcon className='register-icon'/></label>
                <input 
                type='text' 
                name='name' 
                placeholder='Enter Name' 
                onChange={handleLoginChange}
                value={registerData.name} />
            </div>

            <div className='register-input-container'>
                <label name='email'><EmailIcon className='register-icon'/></label>
                <input 
                type='email' 
                name='email' 
                placeholder='Enter Email Id' 
                onChange={handleLoginChange}
                value={registerData.email} />
            </div>

            <div className='register-input-container'>
                <label name='password'><PasswordIcon className='register-icon'/></label>
                <input 
                type='password' 
                name='password' 
                placeholder='Enter Password' 
                onChange={handleLoginChange}
                value={registerData.password} />
            </div>

            <div className='register-input-container'>
                <label name='confirmPassword'><PasswordIcon className='register-icon'/></label>
                <input 
                type='password' 
                name='confirmPassword' 
                placeholder='Confirm Password' 
                onChange={handleLoginChange}
                value={registerData.confirmPassword} />
            </div>

            <div className='register-input-container'>
                <label name='profilePic'><PortraitIcon className='register-icon'/></label>
                <input 
                type='file' 
                name='profilePic' 
                placeholder='Choose Profile Pic' 
                onChange={handleLoginChange}
                value={registerData.profilePic} />
            </div>

            <button type='submit'>Sign Up</button>
        </form>

        <p>Already have an account? <Link to='/login' className='register-link'>Log In</Link></p>
    </div>
  )
}

export default RegisterForm