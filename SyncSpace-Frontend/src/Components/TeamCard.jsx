import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/teamCard.css';

const TeamCard = ({team}) => {

    const navigate = useNavigate();

  return (
    <div className='team-card-container' onClick={() => navigate(`/team/${team._id}`)}>

        <div className='row row-1'>
            <h2>{team.teamName}</h2>
        </div>
        
        <div className="row row-2">
            <p>Description: {team.description}</p>
        </div>

        <div className="row row-3">
            <p className='col'>Total Members: {1 + team.members?.length}</p>
            <p className='col'>Team lead: {team.teamLead?.name}</p>
        </div>

        <div className='row row-4'>
            <p className='col'>Created At: {new Date(team.createdAt).toLocaleDateString()}</p>
            <p className='col'>Total Workspaces: {team.workspaces?.length}</p>
        </div>
        
    </div>
  )
}

export default TeamCard
