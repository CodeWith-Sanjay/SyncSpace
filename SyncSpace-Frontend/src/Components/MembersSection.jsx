import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { gettingMembersDetails, removeTeamMember } from '../services/teamMemberServices.js'
import '../styles/memberSection.css';

const MembersSection = () => {

    // const navigate = useNavigate();
    const {id: teamId} = useParams();
    const [members, setMember] = useState([]);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const res = await gettingMembersDetails(teamId);
                setMember(res.data);
            } catch (error) {
                console.log('Error fetching member details: ', error)
            }
        }

        fetchMember();
    }, [teamId]);

    const handleMemberRemove = async (memberId) => {
        const res = await removeTeamMember(memberId)

        if(res.success) {
            // navigate(`/team/${id}`);
            setMember(prev => prev.filter(m => m._id !== memberId))
        } else {
            alert('Error deleting member');
        }
    }

  return (
    <div className='member-single-container'>
        <div className='member-details-header'>
            <h1>Member Details</h1>
            {/* <button onClick={() => navigate(`/team/${team._id}/addMember`)}>Add Members</button>
            <button onClick={() => navigate(`/team/edit/${team._id}`)}>Edit Team</button> */}
            {/* <button onClick={handleTeamDelete}>Delete Team</button> */}
        </div>

        {members.length > 0 ?
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {members.map((member, index) => (
            <div className='member-details' key={index}>
                <img src={member.user.profilePic} />
                <div className='member-details-text'>
                <p>Name: {member.user.name}</p>
                <p>Description: {member.user.email}</p>
                <p>Role: {member.role}</p>
                <p>Joined At: {new Date(member.joinedAt).toLocaleDateString()}</p>
                </div>

                <div onClick={() => handleMemberRemove(member._id)} style={{width: '100%',display: 'flex', justifyContent: 'center', alignItem: 'center', margin: '5px '}}>
                    <button>Remove</button>
                </div>
            </div>
        ))}
        </div> :
        <div style={{margin: '0 20px'}}>
            <p style={{margin: '0 20px', fontSize: '1.2rem', color: '#4f46e5', fontWeight: '550'}}>
                There is no member in your team. Try Add Members!
            </p>
        </div> }
    </div>
  )
}

export default MembersSection
