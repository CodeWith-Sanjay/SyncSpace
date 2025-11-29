import { api } from "./api.js";

export const addMemberToTeam = async (teamId, data) => {
    try {
        const res = await api.post(`/teamMember/${teamId}/addMember`, data);
        return res.data
    } catch (error) {
        console.log('Error adding members: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}

export const gettingMembersDetails = async (teamId) => {
    try {
        const res = await api.get(`/teamMember/${teamId}/getMember`);
        return res.data
    } catch (error) {
        console.log('Error getting member details: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
} 

export const removeTeamMember = async (memberId) => {
    try {
        const res = await api.delete(`/teamMember/${memberId}/deleteMember`);
        return res.data
    } catch (error) {
        return error.response?.data || {success: false, message: 'Network error'}
    }
}