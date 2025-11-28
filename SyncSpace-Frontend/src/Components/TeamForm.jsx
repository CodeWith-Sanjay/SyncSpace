import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import DescriptionIcon from '@mui/icons-material/Description';


import { createTeam } from '../services/teamServices.js';
import Loader from './Loader/Loader.jsx';
import '../styles/team.css';

const TeamForm = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [teamData, setTeamData] = useState({
        teamName: '',
        description: '',
        visibility: ''
    });
    
    const handleTeamChange = (e) => {
        const {name, value} = e.target
    
        setTeamData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    
    const handleTeamSubmit = async (e) => {
        e.preventDefault();
    
        const validateErrors = {}
    
        if(!teamData.teamName) {
            validateErrors.teamName = 'team name is required'
        }
    
        if(!teamData.description) {
            validateErrors.description = 'team description is required';
        }
    
        setErrors(validateErrors)
        if(Object.keys(validateErrors).length > 0) return

        try {
            setLoading(true)

            const res = await createTeam(teamData);
            if(res.success) {
                alert('Team created successfully');
                navigate(`/teams`);
            } else if (res.message.toLowerCase().trim().includes('name')) {
                setErrors({teamName: res.message});
            } else if (res.message.toLowerCase().trim().includes('different')) {
                setErrors({teamName: res.message});
            } else {
                alert(res.message || 'Something went wrong')
            }            
        } catch (error) {
            console.log('Error creating team: ', error.message);
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='team-container'>
        <h1>Create team here!</h1> <hr></hr>
        <h3>You are not part of any team yet</h3>

        <form className='team-form' onSubmit={handleTeamSubmit}>

            <div className='team-input-container'>
                <label name='teamName'><Diversity3Icon className='team-icon'/></label>
                <input 
                type='text' 
                name='teamName' 
                placeholder='Enter team Name' 
                onChange={handleTeamChange}
                value={teamData.teamName} />
                {errors.teamName && <p className='team-error'>{errors.teamName}</p>}
            </div>

            <div className='team-input-container'>
                <label name='description'><DescriptionIcon className='team-icon'/></label>
                <textarea
                name='description' 
                placeholder='Enter team description' 
                onChange={handleTeamChange}
                value={teamData.description} />
                {errors.description && <p className='team-error'>{errors.description}</p>}
            </div>

            <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Create team'}</button>
        </form>
    </div>
  )
}

export default TeamForm
