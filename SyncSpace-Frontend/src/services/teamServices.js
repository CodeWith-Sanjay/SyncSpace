import { api } from "./api.js";

export const createTeam = async (data) => {
    try {
        const res = await api.post('/team/create', data);
        return res.data
    } catch (error) {
        console.log('Error creating team: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}

export const getAllTeams = async () => {
    try {
        const res = await api.get('/team');
        return res.data
    } catch (error) {
        console.log('Error getting team for user: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}

export const getTeamById = async (teamId) => {
    try {
        const res = await api.get(`/team/${teamId}`);
        return res.data
    } catch (error) {
        console.log('Error getting team: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}

export const editTeam = async (teamId, data) => {
    try {
        const res = await api.put(`/team/update/${teamId}`, data);
        return res.data
    } catch (error) {
        console.log('Error updating team: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}

export const deleteTeam = async (teamId) => {
    try {
        const res = await api.delete(`/team/delete/${teamId}`);
        return res.data
    } catch (error) {
        console.log('Error deleting team: ', error.response?.data || error.response);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}