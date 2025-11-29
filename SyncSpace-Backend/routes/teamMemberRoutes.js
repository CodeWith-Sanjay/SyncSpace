import express from 'express'
import { addTeamMember, gettingMembersDetails, removeTeamMember } from '../controller/teamMemberController.js';

const teamMemberRoutes = express.Router();

teamMemberRoutes.post('/:teamId/addMember', addTeamMember);
teamMemberRoutes.get('/:teamId/getMember', gettingMembersDetails);
teamMemberRoutes.delete('/:memberId/deleteMember', removeTeamMember);

export default teamMemberRoutes