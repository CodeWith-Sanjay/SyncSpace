import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/singleTeamDashboard.css';
import Loader from './Loader/Loader.jsx';
import { getTeamById, deleteTeam } from '../services/teamServices.js';
import MembersSection from './MembersSection.jsx';

const SingleTeamDashboard = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await getTeamById(id);
                const data = res.data ?? res;
                setTeam(data)
            } catch (error) {
                console.log('Error getting teams: ', error.message);
            }
        }

        if(id) fetchTeams();
    }, [id]);

    if(!team) {
        return (<div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader />
        </div>)
    }

    const handleTeamDelete = async () => {
        const res = await deleteTeam(team._id);

        if(res.success) {
            alert('Team deleted successfully');
            navigate('/teams');
        } else {
            alert(res.message || 'Error deleting team');
        }
    }


  return (
    <div className='team-single-container'>
        <div className='team-details-header'>
            <h1>Team Details</h1>
            <button onClick={() => navigate(`/team/${team._id}/addMember`)}>Add Members</button>
            <button onClick={() => navigate(`/team/edit/${team._id}`)}>Edit Team</button>
            <button onClick={handleTeamDelete}>Delete Team</button>
        </div>

        <div className='team-details'>
        <p>Name: {team.teamName}</p>
        <p>Description: {team.description}</p>
        <p>Team lead: {team.teamLead?.name}</p>
        <p>Total Members: {1 + team.members?.length}</p>
        <p>Total Workspaces: {team.workspaces?.length}</p>
        <p>Created At: {new Date(team.createdAt).toLocaleDateString()}</p>
        </div>

        <div>
            <MembersSection />
        </div>
    </div>
  )
}

export default SingleTeamDashboard
