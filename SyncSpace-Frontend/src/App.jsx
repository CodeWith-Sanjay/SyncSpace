import { React } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './styles/App.css';
import RegisterForm from './Components/RegisterForm.jsx';
import LoginRegisterLayout from './pages/LoginRegisterLayout.jsx';
import LoginForm from './Components/LoginForm.jsx';

function App() {

  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRegisterLayout />} >
            <Route element={<RegisterForm />} path='/' />
            <Route element={<LoginForm />} path='/login' />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App