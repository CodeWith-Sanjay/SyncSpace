import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import teamMemberRoutes from './routes/teamMemberRoutes.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/workspace', workspaceRoutes);
app.use('/teamMember', teamMemberRoutes);

connectDB().then(
    app.listen(port, () => {
        console.log(`Server is running on localhost: ${port}`)
    })
).catch(err => {
    console.log('Server error: ', err)
})