import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/teamDashboard.css';
import Loader from './Loader/Loader.jsx';
import TeamCard from './TeamCard.jsx';
import TeamForm from './TeamForm.jsx';
import { getAllTeams } from '../services/teamServices.js';

const TeamDashboard = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await getAllTeams();
                const data = res.data ?? res;
                setTeams(Array.isArray(data) ? data : (data.teams || []));
            } catch (error) {
                console.log('Error loading teams: ', error.message);
                setTeams([]);
            }
        }

        fetchTeams();
    }, []);

    if(teams === null) {
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Loader />
            </div>
        )
    }

    return (
        <div className='teamDashboard-container'>
            {teams.length > 0 ? (
                <div>
                    <div style={{display: 'grid', gridTemplateColumns: '8fr 1fr'}}>
                    <h2 className='teamDashboard-heading'>Your Teams</h2>
                    <button className='team-dashboard-button' onClick={() => navigate('/create-team')}>Create Team</button>
                    </div>
                    <div className='team-dashboard-teams'>
                        {teams.map((team) => (
                            <TeamCard key={team._id} team={team}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <TeamForm />
                </div>
            )}
        </div>
    )
}

export default TeamDashboard
