import React from 'react'

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

import '../styles/sidebar.css';

const Sidebar = ({isOpen}) => {
  return (
    <div className={`sidebar-container ${isOpen ? 'active' : '' }`}>
      <h1>SyncSpace</h1>

      <nav className='sidebar-options'>
        <ul>
            <li><AccountTreeIcon className='sidebar-icon'/> Projects</li>
            <li><GroupsIcon className='sidebar-icon'/> Teams</li>
            <li><ChatIcon className='sidebar-icon'/> Chats</li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
