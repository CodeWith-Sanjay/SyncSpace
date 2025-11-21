import { React } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './styles/App.css';
import RegisterForm from './Components/RegisterForm.jsx';
import LoginRegisterLayout from './pages/LoginRegisterLayout.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import LoginForm from './Components/LoginForm.jsx';
import Dashboard from './Components/Dashboard.jsx';
// import Sidebar from './Components/Sidebar.jsx';
// import Topbar from './Components/Topbar.jsx';

function App() {

  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRegisterLayout />} >
            <Route element={<RegisterForm />} path='/' />
            <Route element={<LoginForm />} path='/login' />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route element={<Dashboard />} path='/dashboard'/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App