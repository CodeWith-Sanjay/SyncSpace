import { Team } from "../model/Team.js";

export const createTeam = async (req, res) => {
    try {
        const {teamName, description} = req.body;
        const id = req.userId

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