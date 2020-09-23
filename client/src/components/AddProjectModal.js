import React, { useState } from 'react'
import axios from 'axios'
import './ui/EditTaskModal.css'
import CloseIcon from '@material-ui/icons/Close'

const AddProjectModal = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [project, setProject] = useState('')
    axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}

    const validate = () =>{
        if(project.length < 2){
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }

    const newProject =() =>{
        axios.post(`http://localhost:5000/user/${props.userID}/projects/add`, {
            project
        })
        .then(()=>{
            props.setProject([project, ...props.projects])
            setProject('')
            props.modal.current.classList.remove('active')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='modal edit-form'>
            <CloseIcon className='close-icon' onClick={() =>{props.modal.current.classList.remove('active')}}/>
            <div className='input-container'>
                <label htmlFor='project'>Project Name</label>
                <input type='text' name='project' value={project} onChange={e => {setProject(e.target.value); validate()}} />
            </div>
            <button disabled={disabled} type='button' className='createTask-button' onClick={()=> newProject()} >CREATE PROJECT</button>
        </div>
    )
}

export default AddProjectModal
