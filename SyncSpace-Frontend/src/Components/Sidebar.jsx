import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

import '../styles/sidebar.css';

const Sidebar = ({isOpen}) => {

  const navigate = useNavigate();
  const [active, setActive] = useState('');

  return (
    <div className={`sidebar-container ${isOpen ? 'active' : '' }`}>
      <h1>SyncSpace</h1>

      <nav className='sidebar-options'>
        <ul>

            <li 
            className={active === 'projects' ? 'sidebar-list active' : 'sidebar-list'}
            onClick={() => {
              setActive('projects')
            }}
            ><AccountTreeIcon 
            className={active === 'projects' ? 'sidebar-icon active' : 'sidebar-icon'} 
            /> Projects</li>

            <li 
            className={active === 'teams' ? 'sidebar-list active' : 'sidebar-list'} 
            onClick= {() => {
              setActive('teams')
              navigate('create-team')
            }}
            ><GroupsIcon 
            className={active === 'teams' ? 'sidebar-icon active' : 'sidebar-icon'} 
            /> Teams</li>

            <li 
            className={active === 'chats' ? 'sidebar-list active' : 'sidebar-list'}
            onClick={() => {
              setActive('chats')
            }}
            ><ChatIcon 
            className={active === 'chats' ? 'sidebar-icon active' : 'sidebar-icon'} 
            /> Chats</li>

        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
