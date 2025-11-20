import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_Access_Secret = process.env.ACCESSTOKEN_SECRET
const JWT_Refresh_Secret = process.env.REFRESHTOKEN_SECRET

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_Access_Secret, {expiresIn: '1h'});
}

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_Refresh_Secret, {expiresIn: '7h'});
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_Access_Secret);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_Refresh_Secret);
}