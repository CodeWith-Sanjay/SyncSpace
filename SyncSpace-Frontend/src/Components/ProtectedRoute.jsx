import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'

import { api } from '../services/api.js'
import Loader from './Loader/Loader.jsx';

const ProtectedRoute = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {

        const checkAuth = async () => {
            try {
                await api.get('/auth/check');
                setIsAuth(true)
            } catch (error) {
                setIsAuth(false);
                console.log('Protected route failed: ', error.message);
            } finally {
                setLoading(false)
            }
        }

        checkAuth();
    }, []);

    if(loading) {
        return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <Loader />
        </div>) 
    }

    return isAuth ? children : <Navigate to='/login' replace/>
}

export default ProtectedRoute
