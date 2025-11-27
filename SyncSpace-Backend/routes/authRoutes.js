import express from 'express';
import { profilePicUpload } from '../middleware/upload.js';
import { registerUser, loginUser, logoutUser } from '../controller/authController.js';
import { accessTokenVerification } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post(
    '/register',
    profilePicUpload.single('profilePic'), 
    registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/logout', logoutUser);

authRoutes.get('/check', accessTokenVerification, (req, res) => {
    return res.status(200).json({message: 'Authenticated', user: req.user})
});

export default authRoutes