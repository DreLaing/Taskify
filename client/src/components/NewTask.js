import React, { useState } from 'react'
import axios from 'axios'
import './ui/NewTask.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewTask = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [task, setTask] = useState('')
    const [date, setDate] = useState()

    const handleChange = (date) =>{
        setDate(date)
        validate()
    }

    const validate = () =>{
        if(task.length < 3 || date === ''){
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }

    const submitTask = () =>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}
        if(props.project){
            axios.post(`http://localhost:5000/user/${props.userID}/add`, {
                task,
                date,
                project: props.project
            })
            .then(response =>{
                props.setTasks(response.data.tasks)
                setTask('')
                setDate('')
                setDisabled(true)
            })
            .catch(err => console.log(err))
        }
        else{
            axios.post(`http://localhost:5000/user/${props.userID}/add`, {
                task,
                date,
            })
            .then(response =>{
                props.setTasks(response.data.tasks)
                setTask('')
                setDate('')
                setDisabled(true)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='newTask-form'>
            <div className='input-container'>
                <label htmlFor='task'>Task</label>
                <input type='text' name='task' placeholder='eg: Walk the dog' value={task} onChange={e => {setTask(e.target.value); validate()}} />
            </div>

            <div className='input-container'>
                <label htmlFor='date'>Date</label>
                <DatePicker 
                    selected={date} 
                    onChange={handleChange}
                />
            </div>

            <button disabled={disabled} type='button' className='createTask-button' onClick={() => {submitTask()}}>CREATE TASK</button>
        </div>
    )
}

export default NewTask
