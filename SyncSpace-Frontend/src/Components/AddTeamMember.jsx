import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';

import '../styles/addTeamMember.css';
import Loader from './Loader/Loader.jsx';
import { addMemberToTeam } from '../services/teamMemberServices.js';

const AddTeamMember = () => {

    const {teamId} = useParams();

    const [addMemberData, setAddMemberData] = useState({
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // console.log("Team ID from URL =", teamId);

    const handleTeamMemberChange = (e) => {
        const {name, value} = e.target;

        setAddMemberData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const validateForm = () => {
        const newErrors = {}
        const emailRegexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!addMemberData.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegexCode.test(addMemberData.email)) {
            newErrors.email = 'Invalid email id'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleTeamMemberSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return

        setLoading(true);
        setErrors({});
        setSuccessMsg('');

        try {
            const res = await addMemberToTeam(teamId, addMemberData);

            if(res.success) {
                setSuccessMsg('Member added successfully');
                setAddMemberData({email: ''})
            } else if (res.message.toLowerCase().trim().includes('user')) {
                setErrors({email: res.message})
            } else if (res.message.toLowerCase().trim().includes('team')) {
                setErrors({email: res.message})
            } else {
                console.log(res.message || 'Something went wrong')
            }
            
            
        } catch (error) {
            setErrors({email: error.response?.data?.message || 'Failed to add member'})
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='team-member-container'>
    
            <form className='team-member-form' onSubmit={handleTeamMemberSubmit}>

                <p>Add Members</p>
    
                <div className='team-member-input-container'>
                    <label name='name'><PersonIcon className='team-member-icon'/></label>
                    <input 
                    type='email' 
                    name='email' 
                    placeholder='Enter Email Id' 
                    onChange={handleTeamMemberChange}
                    value={addMemberData.email} />
                    {errors.email && <p className='team-member-error'>{errors.email}</p>}
                    {successMsg && <p className='team-member-success'>{successMsg}</p>}
                </div>
    
                <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Add Member'}</button>
            </form>
        </div>
  )
}

export default AddTeamMember
