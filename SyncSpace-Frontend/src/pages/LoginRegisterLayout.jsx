import React from 'react'
import { Outlet } from 'react-router-dom';

import '../styles/loginRegisterLayout.css';

const LoginRegisterLayout = () => {
  return (
    <div className='login-register-container'>
      <Outlet />
    </div>
  )
}

export default LoginRegisterLayout
