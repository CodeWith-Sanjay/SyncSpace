import express from 'express'
import { accessTokenVerification } from '../middleware/authMiddleware.js';
import { createTeam } from '../controller/teamController.js';
import { createWorkspace } from '../controller/workspaceController.js';

const teamRoutes = express.Router();

teamRoutes.post('/create', accessTokenVerification, createTeam);
teamRoutes.post('/:teamId/workspaces/create', accessTokenVerification, createWorkspace);


export default teamRoutes