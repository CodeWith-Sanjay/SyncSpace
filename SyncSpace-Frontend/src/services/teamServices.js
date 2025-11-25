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