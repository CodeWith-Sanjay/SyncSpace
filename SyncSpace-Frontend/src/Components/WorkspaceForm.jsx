import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';

import Loader from './Loader/Loader.jsx';
import '../styles/workspace.css';

const WorkspaceForm = () => {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [workspaceData, setWorkspaceData] = useState({
        workspaceName: '',
        description: '',
        visibility: ''
    });

    const handleWorkspaceChange = (e) => {
        const {name, value} = e.target

        setWorkspaceData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleWorkspaceSubmit = (e) => {
        e.preventDefault();

        const validateErrors = {}

        if(!workspaceData.workspaceName) {
            validateErrors.workspaceName = 'Workspace name is required'
        }

        if(!workspaceData.description) {
            validateErrors.description = 'Workspace description is required';
        }

        if(!workspaceData.visibility) {
            validateErrors.visibility = 'Set the visibility workspace of workspace';
        }

        setErrors(validateErrors)
        if(Object.keys(validateErrors).length > 0) return
        
        try {
            setLoading(true)
        } catch (error) {
            console.log('Error create workspace: ', error.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='workspace-container'>
        <h1>Create workspace here!</h1> <hr></hr>

        <form className='workspace-form' onSubmit={handleWorkspaceSubmit}>

            <div className='workspace-input-container'>
                <label name='workspaceName'><WorkspacePremiumIcon className='workspace-icon'/></label>
                <input 
                type='text' 
                name='workspaceName' 
                placeholder='Enter Workspace Name' 
                onChange={handleWorkspaceChange}
                value={workspaceData.name} />
                {errors.workspaceName && <p className='workspace-error'>{errors.workspaceName}</p>}
            </div>

            <div className='workspace-input-container'>
                <label name='visibility'><VisibilityIcon className='workspace-icon'/></label>
                <select
                name='visibility'
                onChange={handleWorkspaceChange}
                value={workspaceData.visibility}
                >
                    <option value="" disabled>Select the visibility option</option>
                    <option>public</option>
                    <option>private</option>
                    <option>team</option>
                </select>
                {errors.visibility && <p className='workspace-error'>{errors.visibility}</p>}
            </div>

            <div className='workspace-input-container'>
                <label name='description'><DescriptionIcon className='workspace-icon'/></label>
                <textarea
                name='description' 
                placeholder='Enter workspace description' 
                onChange={handleWorkspaceChange}
                value={workspaceData.description} />
                {errors.description && <p className='workspace-error'>{errors.description}</p>}
            </div>

            <button type='submit' disabled={loading}>{loading ? <Loader /> : 'Create Workspace'}</button>
        </form>
    </div>
  )
}

export default WorkspaceForm
