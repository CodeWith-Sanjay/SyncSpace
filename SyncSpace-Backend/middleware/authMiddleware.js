import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../config/token.js";
import { User } from "../model/User.js";

export const refreshTokenVerification = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) {
        return null
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);
        console.log('Refresh token verified: ', decoded);

        if(!decoded || !decoded.userId) return null

        const user = await User.findOne({refreshToken: refreshToken})
        if(!user) {
            return null
        }

        const newAccessToken = generateAccessToken({userId: decoded.userId});
        console.log('New access token generated: ', newAccessToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1 * 60 * 60 * 1000
        });

        return newAccessToken
    } catch (error) {
        console.log('Refresh token verification failed: ', error.message);
        return null
    }
}

export const accessTokenVerification = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    try {
        if(!accessToken) {
            accessToken = await refreshTokenVerification(req, res);

            if(!accessToken) {
                return res.status(401).json({
                    message: 'No access token'
                });
            }
        }

        const decoded = verifyAccessToken(accessToken);

        if(!decoded || !decoded.userId) {
            throw new Error('Invalid token payload');
        }
        
        req.userId = decoded.userId

        return next();

    } catch (error) {

        if(error.name === 'TokenExpiredError') {

            const newAccessToken = await refreshTokenVerification(req, res);
            if(!newAccessToken) {
                return res.status(401).json({
                    message: 'Refresh token expired'
                })
            }

            const decoded = verifyAccessToken(newAccessToken);
            req.userId = decoded.userId

            return next();
        }

        console.log('Access token verification failed: ', error.message);
        return res.status(401).json({message: 'Invalid access token'});
    }
}