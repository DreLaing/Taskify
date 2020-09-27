import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import NewTask from './NewTask'
import Tasks from './Tasks'

const ProjectPage = () => {
    const location = useLocation()
    const { project } = useParams()
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([{
        _id: '',
        task:'',
        dueDate:'',
        dateCreated:''
    }])
    const [completedTasks, setCompletedTasks] = useState([{
        _id:'',
        task:'',
        dueDate:'',
        dateCreated:''
    }])

    const token = localStorage.getItem("token")
    const userID = localStorage.getItem("userID")

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${userID}/${project}`)
        .then(user => {
            setTasks(user.data.tasks)
            setCompletedTasks(user.data.completedTasks)
            console.log(user.data)
        })
        .catch(err => console.log(err))
    },[loading, location])
    return (
        <div className='homepage-container'>
            <div>
                <h3 className='heading form-heading'>Create New "{project}" Task</h3>
                <div className='content-container'>
                    <NewTask userID={userID} project={project} token={token} setTasks={setTasks} setLoading={setLoading}/>
                    <div className='tasks-container'>
                        
                        <div>
                            <h3 className='heading'>"{project}" Tasks</h3>
                            {tasks.length < 1 ? <h4 style={{margin:'10px 0px 0px 20px'}}>No Current Tasks</h4> :
                            tasks.map((task)=>{
                                return <Tasks key={task._id} task={task} editable={true} token={token} userID={userID} setLoading={setLoading} loading={loading}/>
                            })}
                        </div>

                        <div>
                            <h3 className='heading'>Completed "{project}" Tasks</h3>
                            {completedTasks.length < 1 ? <h4 style={{margin:'10px 0px 0px 20px'}}>No Completed Tasks</h4> :
                                completedTasks.map(task =>{
                                return <Tasks key={task._id} task={task} editable={false} completed={true} token={token} userID={userID} setLoading={setLoading} loading={loading} />
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectPage
