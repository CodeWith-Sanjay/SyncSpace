import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    workspaceName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    visibility: {
        type: String,
        enum: ['private', 'team', 'public'],
        default: 'team'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Workspace = mongoose.model('Workspace', WorkspaceSchema);