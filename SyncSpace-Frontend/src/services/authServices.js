import { api } from "./api.js";

export const registerUser = async (data) => {
    try {
        const res = await api.post('/auth/register', data);
        return res.data
    } catch (error) {
        console.log('Service Error: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}; 
    }
}

export const loginUser = async (data) => {
    try {
        const res = await api.post('/auth/login', data);
        return res.data
    } catch (error) {
        console.log('Service Error: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
}