import express from 'express';
import { getWorkspaceById } from '../controller/workspaceController.js';

const workspaceRoutes = express.Router();

workspaceRoutes.get('/:id', getWorkspaceById);

export default workspaceRoutes