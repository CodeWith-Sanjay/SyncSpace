import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    description: {
        type: String,
        default: ''
    }
}, {timestamps: true});

export const Team = mongoose.model('Team', teamSchema);