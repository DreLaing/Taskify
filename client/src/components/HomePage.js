import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './ui/HomePage.css'
import NewTask from './NewTask'
import Tasks from './Tasks'

const HomePage = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([{
        _id: '',
        task:'',
        dueDate:'',
        dateCreated:'',
        dateCompleted:''
    }])
    const [completedTasks, setCompletedTasks] = useState([{
        _id:'',
        task:'',
        dueDate:'',
        dateCreated:'',
        dateCompleted:''
    }])

    const token = localStorage.getItem("token")
    const userID = localStorage.getItem("userID")

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${userID}`)
        .then(user => {
            setTasks(user.data.tasks)
            setCompletedTasks(user.data.completedTasks)
            console.log(user.data.tasks)
        })
        .catch(err => console.log(err))
    },[loading])
    return (
        <div className='homepage-container'>
            <div>
                <h3 className='heading form-heading'>Create New Task</h3>
                <div className='content-container'>
                    <NewTask userID={userID} setTasks={setTasks} token={token} setLoading={setLoading}/>
                    <div className='tasks-container'>
                        
                        <div>
                            <h3 className='heading'>Tasks</h3>
                            {tasks.length < 1 ? <h4 style={{margin:'10px 0px 0px 20px'}}>No Current Tasks</h4> :
                                tasks.map((task)=>{
                                    return <Tasks key={task._id} task={task} editable={true} token={token} userID={userID} setLoading={setLoading} loading={loading}/>
                                })}
                        </div>

                        <div>
                            <h3 className='heading'>Completed Tasks</h3>
                            {completedTasks.length < 1 ? <h4 style={{margin:'10px 0px 0px 20px'}}>No Completed Tasks</h4> :
                                completedTasks.map(task =>{
                                    return <Tasks key={task._id} task={task} editable={false} completed={true} token={token} userID={userID} setLoading={setLoading} loading={loading}/>
                                })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage
