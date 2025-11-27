import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { getTeamById } from '../services/teamServices.js'
import Loader from './Loader/Loader.jsx';

const TeamDashboard = () => {

    const {id} = useParams();
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await getTeamById(id);
                setTeamData(res.data);
            } catch (error) {
                console.log('Error getting team by id: ', error.message);
            }
        }

        fetchTeam();
    }, [id]);

    if(!teamData) return <Loader style={{height: '30px', width: '30px', border: '3px solid black', borderTopColor: 'black' }}/>

  return (
    <div>
            <div>
                <h1>{teamData.teamName}</h1>
                <h1>{teamData.description}</h1>
                <h1>{teamData.createAt}</h1>
                <h1>{teamData.teamLead}</h1>
            </div>
    </div>
  )
}

export default TeamDashboard
