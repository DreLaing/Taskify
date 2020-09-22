import React from 'react'
import { Link } from 'react-router-dom'
import './ui/Sidebar.css'

const Sidebar = (props) => {
    const userID = localStorage.getItem("userID")
    return (
        <nav className='nav'>
            <p className='logo'>Taskify</p>
            <div className='nav-links'>
                <Link to={`/user/${userID}`}>All Tasks</Link>
                {props.projects.map(project =>{
                    return <Link to={`/user/${userID}/${project}`}>{project}</Link>
                })}
            </div>
        </nav>
    )
}

export default Sidebar
