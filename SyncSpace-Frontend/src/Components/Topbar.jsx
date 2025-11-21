import React from 'react'

import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import '../styles/topbar.css';

const Topbar = ({onMenuClick, isOpen}) => {
  return (
    <div className='topbar-container'>

        {isOpen ? 
        <CloseIcon className='menu-btn' onClick={onMenuClick}/> :
        <MenuIcon className='menu-btn' onClick={onMenuClick} />
        }

        <div className="topbar-search-container">
            <input type='search' placeholder='Search Here...'/>
            <label><SearchIcon className='topbar-icon'/></label>
        </div>

      <div className='topbar-icon-container'>
        <PersonIcon className='topbar-icon'/>
        <NotificationsIcon className='topbar-icon'/>
      </div>
    </div>
  )
}

export default Topbar
