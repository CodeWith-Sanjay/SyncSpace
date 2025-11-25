import { Workspace } from "../model/WorkSpace.js";
import { Team } from "../model/Team.js";

export const createWorkspace = async (req, res) => {
    try {
        const {workspaceName, visibility, description} = req.body;
        const {teamId} = req.params

        if(!workspaceName || !teamId) {
            return res.status(400).json({
                success: false,
                message: 'Workspace name and team are required'
            });
        }

        const name = workspaceName.trim();

        if(name.length < 3 || name.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'Workspace name length must be between 3 and 50 characters'
            });
        }

        const allowedVisibility = ['public', 'private', 'team']
        if(visibility && !allowedVisibility.includes(visibility)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid visibility option'
            });
        }

        const teamExist = await Team.findById(teamId);
        if(!teamExist) {
            return res.status(400).json({
                success: false,
                message: 'Team not found'
            });
        }

        const existingWorkSpace = await Workspace.findOne({workspaceName: name, teamId});
        if(existingWorkSpace) {
            return res.status(400).json({
                success: false,
                message: 'Workspace already exist in this team'
            });
        }

        const workspace = await Workspace.create({
            workspaceName: name,
            visibility: visibility || 'team',
            description: description || '',
            team: teamId,
            createdBy: req.userId
        });

        return res.status(201).json({
            success: true,
            message: 'Workspace created successfully',
            data: workspace
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating workspace',
            error: error.message
        });
    }
}

export const getWorkspaceById = async (req, res) => {
    try {
        const {id} = req.params;

        const workspace = await Workspace.findById(id);
        if(!workspace) {
            return res.status(400).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Getting workspace with Id successful',
            data: workspace
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Getting workspace with Id failed',
            error: error.message
        });
    }
}