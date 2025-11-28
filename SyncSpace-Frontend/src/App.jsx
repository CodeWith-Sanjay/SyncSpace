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
import SingleTeamDashboard from './Components/SingleTeamDashboard.jsx';
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
            <Route path='/teams' element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>}/>
            <Route path='/team/:id'element={<ProtectedRoute><SingleTeamDashboard /></ProtectedRoute>}/>
            <Route path='/create-workspace' element={<ProtectedRoute><WorkspaceForm /></ProtectedRoute>}/>
            <Route path='/create-team' element={<ProtectedRoute><TeamForm /></ProtectedRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App