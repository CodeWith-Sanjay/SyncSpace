import { React } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './styles/App.css';
import RegisterForm from './Components/RegisterForm.jsx';
import LoginRegisterLayout from './pages/LoginRegisterLayout.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import LoginForm from './Components/LoginForm.jsx';
import Dashboard from './Components/Dashboard.jsx';
import WorkspaceForm from './Components/WorkspaceForm.jsx';
import TeamForm from './Components/TeamForm.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import TeamDashboard from './Components/TeamDashboard.jsx';
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
            <Route element={<ProtectedRoute><WorkspaceForm /></ProtectedRoute>} path='/create-workspace'/>
            <Route element={<ProtectedRoute><TeamForm /></ProtectedRoute>} path='/create-team'/>
            <Route element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>} path='/team/:id'/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App