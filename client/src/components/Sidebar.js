import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './ui/Sidebar.css'
import AddProjectModal from './AddProjectModal'

const Sidebar = () => {
    const location = useLocation()
    const modal = useRef(null)
    const userID = localStorage.getItem("userID")
    const [projects, setProjects] = useState([''])
    const token = localStorage.getItem("token")
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${userID}/projects`)
        .then(response =>{
            setProjects(response.data)
        })
        .catch(err => console.log(err))
    })

    return (
        <>
        <nav className='nav'>
            <p className='logo'>Taskify</p>
            <hr/>
            <div className='nav-links'>
                <Link to={`/user/${userID}`} className={location.pathname==`/user/${userID}` && 'active-link'}>All Tasks</Link>
                {projects.map(project =>{
                    return <Link to={`/user/${userID}/${project}`} className={location.pathname==`/user/${userID}/${project}` && 'active-link'}>{project}</Link>
                })}
                <p className='create-project' onClick={()=> modal.current.classList.add('active')}>+ Create new project</p>
            </div>
            <hr/>
            <div className='sidebar-footer'>
                <p style={{cursor:'pointer'}}>Logout <ExitToAppIcon /></p>
                <p style={{fontSize:'15px'}}>&#169;2020 Andre' Laing</p>
            </div>
        </nav>
        <div ref={modal} className='modal-bg'>
            <AddProjectModal token={token} userID={userID} modal={modal} setProjects={setProjects} projects={projects}/>
        </div>
    </>
    )
}

export default Sidebar
