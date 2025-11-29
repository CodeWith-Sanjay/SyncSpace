import express from 'express'
import { accessTokenVerification } from '../middleware/authMiddleware.js';
import { createTeam, deleteTeam, editTeam, getAllTeamsUser, getTeamById } from '../controller/teamController.js';
import { createWorkspace } from '../controller/workspaceController.js';

const teamRoutes = express.Router();

teamRoutes.get('/', accessTokenVerification, getAllTeamsUser);
teamRoutes.post('/create', accessTokenVerification, createTeam);
teamRoutes.post('/:teamId/workspaces/create', accessTokenVerification, createWorkspace);
teamRoutes.get('/:id', accessTokenVerification, getTeamById);
teamRoutes.put('/update/:id', accessTokenVerification, editTeam);
teamRoutes.delete('/delete/:id', accessTokenVerification, deleteTeam);


export default teamRoutes