import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ui/EditTaskModal.css'
import CloseIcon from '@material-ui/icons/Close'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTaskModal = (props) => {
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}

    useEffect(()=>{
        setTask(props.task)
    },[])

    const handleChange = (date) =>{
        setDate(date)
        // validate()
    }

    const updateTask = () =>{
        axios.post(`http://localhost:5000/user/${props.userID}/update/${props.taskID}`, {
            task:task,
            date:date,
        })
        .then(()=> {
            props.setLoading(true)
            props.modal.current.classList.remove('active')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='modal edit-form'>
            <CloseIcon className='close-icon' onClick={() =>{props.modal.current.classList.remove('active')}}/>
            <div className='input-container'>
                <label htmlFor='task'>Task</label>
                <input type='text' name='task' value={task} onChange={e => {setTask(e.target.value)}}/>
            </div>

            <div className='input-container'>
                <label htmlFor='date'>Date</label>
                <DatePicker 
                    selected={date} 
                    onChange={handleChange}
                />
            </div>

            <button /*disabled={disabled}*/ type='button' className='createTask-button' onClick={()=> updateTask()}>UPDATE TASK</button>
        </div>
    )
}

export default EditTaskModal
