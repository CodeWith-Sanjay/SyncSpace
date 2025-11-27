import { generateAccessToken, generateRefreshToken } from "../config/token.js";
import { User } from "../model/User.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // const {profilePic} = req.file

        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            profilePic: req.file ? req.file.path : null
        }

        const user = await User.create(userData);

        const accessToken = generateAccessToken({userId: user._id})
        const refreshToken = generateRefreshToken({userId: user._id});

        console.log("Req body:", req.body);
        console.log("Req file:", req.file);

        user.refreshToken = refreshToken
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1 * 60 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 60 * 60 * 1000
        });

        console.log(user);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) {
            return res.status(400).json({
                success: false,
                message: 'Password is not match'
            });
        }

        console.log("Req body:", req.body);
        console.log("Req file:", req.file);

        const accessToken = generateAccessToken({userId: user._id});
        const refreshToken = generateRefreshToken({userId: user._id});

        user.refreshToken = refreshToken
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1 * 60 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 60 * 60 * 1000
        });
        console.log(user);

        return res.status(200).json({
            success: true,
            message: 'User logged in successful',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error logging user',
            error: error.message
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const refresh = req.cookies.refreshToken;

        if(refresh) {
            await User.updateOne({refreshToken: refresh}, {$set: {refreshToken: null}})
        }

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return res.status(200).json({
            success: true,
            message: 'User logged out successful'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error logging out user',
            error: error.message
        });
    }
}
