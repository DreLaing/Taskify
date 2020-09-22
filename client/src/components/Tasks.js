import React, { useState, useEffect } from 'react'
import './ui/Tasks.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';

const Tasks = (props) => {
    const [overdue, setOverdue] = useState(false)
    const [dateCreated, setDateCreated] = useState('')

    useEffect(()=>{
        if(new Date(Date.now()) >= new Date(props.task.dueDate)){
            setOverdue(true)
        }
    },[])

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
            {props.editable===true
            && 
                <div className='taskIcons-container'>
                    <DoneIcon />
                    <EditIcon />
                    <DeleteForeverIcon />
                </div>}
            <p className='task'>{props.task.task}</p>
            <div className='task-date'>
                <p className={props.completed===true ? 'completed'
                    :
                    overdue===true ? 'overdue' : 'not-overdue'
                    }>
                        <span>{formatDate(new Date(props.task.dueDate.slice(0, 10)))}</span> 
                        <i><DoneIcon /></i>
                </p>
            </div>
            {/* <div>
                <p>Created: {formatDate(new Date(props.task.dateCreated.slice(0, 10)))}</p>
            </div> */}

        </div>
    )
}

export default Tasks
