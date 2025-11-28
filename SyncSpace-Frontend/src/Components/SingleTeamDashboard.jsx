import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import '../styles/singleTeamDashboard.css';
import Loader from './Loader/Loader.jsx';
import { getTeamById } from '../services/teamServices.js';

const SingleTeamDashboard = () => {
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


  return (
    <div className='team-single-container' test-style style={{background: "yellow", padding: "100px"}}>
        <h2>TeamName: {team.teamName}</h2>
        <p>Description: {team.description}</p>
        <p>Created At: {new Date(team.createdAt).toLocaleDateString()}</p>
        <p>Team lead: {team.teamLead?.name}</p>
        <p>Total Members: {1 + team.members?.length}</p>
        <p>Total Workspaces: {team.workspaces?.length}</p>
    </div>
  )
}

export default SingleTeamDashboard
