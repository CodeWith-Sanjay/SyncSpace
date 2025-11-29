import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Diversity3Icon from '@mui/icons-material/Diversity3';
import DescriptionIcon from '@mui/icons-material/Description';

import { editTeam, getTeamById } from '../services/teamServices.js';
import Loader from './Loader/Loader.jsx';


const EditTeam = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [teamData, setTeamData] = useState({
        teamName: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await getTeamById(id);
                if(res.success) {
                    setTeamData({
                        teamName: res.data.teamName,
                        description: res.data.description
                    })
                }
            } catch (error) {
                console.log('Error fetching team: ', error.message)
            }
        }

        fetchTeam();
    }, [id])

    const handleTeamChange = (e) => {
        const {name, value} = e.target;

        setTeamData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const validateForm = () => {
        const newErrors = {};

        if(!teamData.teamName) {
            newErrors.teamName = 'Team name is required'
        }

        if(!teamData.description) {
            newErrors.description = 'Description is required'
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleTeamSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        setLoading(true)

        const res = await editTeam(id, teamData);
        setLoading(false);

        if(res.success) {
            // alert('Team updated succfully');
            navigate('/teams');
        } else {
            alert(res.message || 'Error updating team');
        }
    }
  return (
      <div className='team-container' style={{margin: '20px'}}>
        <h1>Edit team here!</h1> <hr></hr>
        {/* <h3>You are not part of any team yet</h3> */}

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

            <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Edit team'}</button>
        </form>
    </div>
  )
}

export default EditTeam
