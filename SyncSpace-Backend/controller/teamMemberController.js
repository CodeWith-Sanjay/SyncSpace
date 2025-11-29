import { Team } from "../model/Team.js";
import { TeamMember } from "../model/TeamMembers.js";
import { User } from "../model/User.js";

export const addTeamMember = async (req, res) => {
    try {
        const {teamId} = req.params;
        const {email} = req.body;

        const team = await Team.findById(teamId);
        if(!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const existingUser = await TeamMember.findOne({
            team: teamId,
            user: user._id
        });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already member of this team'
            });
        }

        team.members.push(user._id);
        await team.save();

        const newMember = await TeamMember.create({
            team: teamId,
            user: user._id,
            role: 'member'
        });

        return res.status(201).json({
            success: true,
            message: 'Member added successfully',
            data: newMember
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error adding members',
            error: error.message
        });
    }
}

export const gettingMembersDetails = async (req, res) => {
    try {
        const {teamId} = req.params;

        const teamMember = await TeamMember.find({team: teamId})
        .populate('user', 'name profilePic email');
        if(!teamMember) {
            return res.status(400).json({
                success: false,
                message: 'Team member not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Getting member details successful',
            data: teamMember
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting members details',
            error: error.message
        })
    }
}

export const removeTeamMember = async (req, res) => {
    try {
        const {memberId} = req.params;

        const deleteMember = await TeamMember.findByIdAndDelete(memberId);

        if(!deleteMember) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Deleting team member successful',
            data: deleteMember
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error removing team member',
            error: error.message
        });
    }
}