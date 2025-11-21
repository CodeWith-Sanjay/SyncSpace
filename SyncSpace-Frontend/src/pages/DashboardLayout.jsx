import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import '../styles/dashboardLayout.css';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

const DashboardLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='dashboard-layout-container'>
        <Sidebar isOpen={sidebarOpen} />

        <div className="dashboard-main">
            <Topbar isOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)}/>
            <Outlet />
        </div>

    </div>
  )
}

export default DashboardLayout
