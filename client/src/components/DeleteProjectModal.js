import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'

const DeleteProjectModal = (props) => {
    const history = useHistory()

    const deleteProject = () =>{
        axios.delete(`http://localhost:5000/user/${props.userID}/delete/project/${props.project}`)
        .then(()=> {
            history.push(`/user/${props.userID}`)
            props.modal.current.classList.remove('active')
        })
        .catch(()=> alert(`Failed to delete ${props.project}`))
    }
    return (
        <div className='modal edit-form' style={{zIndex:'100'}}>
            <CloseIcon className='close-icon' onClick={() =>{props.modal.current.classList.remove('active')}}/>
            <h4 style={{width:'80%', position:'relative', top:'10px', margin:'auto'}}>Deleting this project will delete all related tasks. Are you sure you want to delete this project?</h4>
            <button type='button' className='deleteTask-button' onClick={()=> deleteProject()} >DELETE PROJECT</button>
        </div>
    )
}

export default DeleteProjectModal
