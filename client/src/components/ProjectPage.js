import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import NewTask from './NewTask'
import Tasks from './Tasks'

const ProjectPage = () => {
    const { project } = useParams()
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
    const [projects, setProjects] = useState([''])
    const token = localStorage.getItem("token")
    const userID = localStorage.getItem("userID")

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${userID}/${project}`)
        .then(user => {
            setTasks(user.data.tasks)
            setCompletedTasks(user.data.completedTasks)
            setProjects(user.data.projects)
            console.log(user.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div className='homepage-container'>
            <Sidebar projects={projects}/>
            <div>
                <h3 className='heading form-heading'>CREATE NEW "{project}" TASK</h3>
                <div className='content-container'>
                    <NewTask userID={userID} project={project} token={token} setTasks={setTasks}/>
                    <div className='tasks-container'>
                        
                        <div>
                            <h3 className='heading'>"{project}" Tasks</h3>
                            {tasks.map((task)=>{
                                return <Tasks key={task._id} task={task} editable={true} />
                            })}
                        </div>

                        <div>
                            <h3 className='heading'>Completed "{project}" Tasks</h3>
                            {completedTasks.map(task =>{
                                return <Tasks key={task._id} task={task} editable={false} />
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectPage
