import { api } from "./api.js";

export const createWorkspace = async (data) => {
    try {
        const res = await api.post(``, data);
        return res.data
    } catch (error) {
        console.log('Error creating workspace: ', error.response?.data || error.message);
        return error.response?.data || {success: false, message: 'Network error'}
    }
} 