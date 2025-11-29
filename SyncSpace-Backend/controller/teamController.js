import { Team } from "../model/Team.js";

export const createTeam = async (req, res) => {
    try {
        const {teamName, description} = req.body;
        const id = req.user.userId

        const name = teamName.trim();

        if (name.length <= 3 || name.length >= 50) {
            return res.status(400).json({
                success: false,
                message: 'Team name length must be between 3 and 50 characters'
            });
        }

        const existingTeamName = await Team.findOne({teamName: name});
        if(existingTeamName) {
            return res.status(400).json({
                success: false,
                message: 'Try a different team name'
            });
        }

        const team = await Team.create({
            teamName: name,
            description: description,
            teamLead: id
        });

        return res.status(200).json({
            success: true,
            message: 'Team created successfully',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating a team',
            error: error.message
        });
    }
}

export const editTeam = async (req, res) => {
    try {
        const {id} = req.params
        const {teamName, description} = req.body;

        const team = await Team.findByIdAndUpdate(id, {teamName, description}, {new: true});
        if(!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Team updated successfully',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Editing team failed',
            error: error.message
        });
    }
}

export const deleteTeam = async (req, res) => {
    try {
        const {id} = req.params;

        const team = await Team.findByIdAndDelete(id);
        
        return res.status(200).json({
            success: true,
            message: 'Team deleted successfully',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting team',
            error: error.message
        });
    }
}

export const getAllTeamsUser = async (req, res) => {
    try {
        const id = req.user.userId

        const team = await Team.find({$or: [{teamLead: id}, {members: id}]})
            .populate('teamLead', 'name email')
            .populate('members', 'name email')
            .populate('workspaces');

        if(!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Getting teams for user successful',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Getting all teams for users failed',
            error: error.message
        });
    }
}

export const getTeamById = async (req, res) => {
    try {
        const teamId = req.params.id

        const team = await Team.findById(teamId)
            .populate('teamLead', 'name email')
            .populate('members', 'name email')
            .populate('workspaces');

        if(!team) {
            return res.status(404).json({
                success: false,
                message: 'There is not any team here',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Team gets successfully',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Getting team by id failed',
            error: error.message
        });
    }
}