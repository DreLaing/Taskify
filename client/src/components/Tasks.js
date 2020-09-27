import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './ui/Tasks.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import EditTaskModal from './EditTaskModal'

const Tasks = (props) => {
    const modal = useRef(null)
    const [overdue, setOverdue] = useState(false)
    const [dateCreated, setDateCreated] = useState('')
    axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}

    useEffect(()=>{
        if(new Date(Date.now()) > new Date(props.task.dueDate)){
            setOverdue(true)
        }
    },[])

    if(props.loading){
        props.setLoading(false)
    }

    const markAsCompleted = () =>{
        axios.post(`http://localhost:5000/user/${props.userID}/complete/${props.task._id}`, {})
        .then(response => props.setLoading(true))
        .catch(err => console.log(err))
    }

    const deleteTask = () =>{
        axios.delete(`http://localhost:5000/user/${props.userID}/delete/${props.task._id}`)
        .then(() => props.setLoading(true))
        .catch(err => console.log(err))
    }

    function formatDate(date) {
        var monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct",
          "Nov", "Dec"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return monthNames[monthIndex] + ' ' +day + ' ' + year;
      }

    return (
        <div className='task-container'>
                <div className='taskIcons-container'>
                    <div data-tooltip='Mark as completed' className={props.completed===true && 'hide'} onClick={()=>markAsCompleted()}><DoneIcon fontSize='small'/></div>
                    
                    <div data-tooltip='Edit task' className={props.completed===true && 'hide'}><EditIcon fontSize='small' onClick={() =>{ 
                                                                            modal.current.classList.add('active')}}/></div>

                    <div data-tooltip='Delete task' onClick={()=> deleteTask()}><DeleteForeverIcon fontSize='small'/></div>
                </div>

            <p className='task'  style={{left: props.editable===true ? '17%' : '7%'}} >{props.task.task}</p>
            <div className='task-date'>
                <div className={props.completed===true ? 'completed'
                    :
                    overdue===true ? 'overdue' : 'not-overdue'
                    }>
                        <span>{formatDate(new Date(props.task.dueDate.slice(0, 10)))}</span>
                        {props.completed === true && <p className='done'>Completed on {formatDate(new Date(props.task.dateCompleted))}</p>}
                </div>
            </div>

            <div ref={modal} className='modal-bg'>
                <EditTaskModal taskID={props.task._id} modal={modal} task={props.task.task} token={props.token} userID={props.userID} setLoading={props.setLoading}/>
            </div>
        </div>
    )
}

export default Tasks
