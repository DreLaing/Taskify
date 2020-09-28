import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './ui/Sidebar.css'
import CloseIcon from '@material-ui/icons/Close'
import AddProjectModal from './AddProjectModal'
import DeleteProjectModal from './DeleteProjectModal'
import MenuIcon from '@material-ui/icons/Menu';

const Sidebar = () => {
    const [deleteID, setDeleteID] = useState()
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const location = useLocation()
    const nav = useRef(null)
    const modal = useRef(null)
    const menuIcon = useRef(null)
    const deleteModal = useRef(null)
    const userID = localStorage.getItem("userID")
    const [projects, setProjects] = useState([''])
    const token = localStorage.getItem("token")
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${userID}/projects`)
        .then(response =>{
            setProjects(response.data)
        })
        .catch(err => history.push('/'))
    },[loading, location])

    if(loading){
        setLoading(false)
    }
    
    const logout = () =>{
        history.push('/')
    }

    const toggleSidebar = () =>{
        setVisible(!visible)
        if(visible){
            nav.current.classList.remove("show")
            menuIcon.current.classList.remove("show")
        }
        else{
            nav.current.classList.add("show")
            menuIcon.current.classList.add('show')
        }
    }

    return (
        <>
        <div className='mobile-nav'><MenuIcon ref={menuIcon} className='menu-icon' onClick={()=> toggleSidebar()} fontSize='large'/></div>
        <nav className='nav' ref={nav}>
            <p><Link className='logo' to={`/user/${userID}`}>Taskify</Link></p>
            <hr/>
            <div className='nav-links'>
                <Link to={`/user/${userID}`} className={location.pathname==`/user/${userID}` && 'active-link'}>All Tasks</Link>
                {projects.map(project =>{
                    return <Link style={{alignContent:'center', display:'flex', position: 'relative'}} to={`/user/${userID}/${project}`} className={location.pathname==`/user/${userID}/${project}` && 'active-link'}>
                                {project}
                                <CloseIcon id='deleteProjectIcon' onClick={()=> {deleteModal.current.classList.add('active'); setDeleteID(project)}}/>
                            </Link>
                })}
                <p className='create-project' onClick={()=> modal.current.classList.add('active')}>+ Create new project</p>
            </div>
            <hr/>
            <div className='sidebar-footer'>
                <p style={{cursor:'pointer'}} onClick={()=>logout()}>Logout <ExitToAppIcon /></p>
                <p style={{fontSize:'15px'}}>&#169;2020 Andre' Laing</p>
            </div>
        </nav>
        <div ref={modal} className='modal-bg'>
            <AddProjectModal token={token} userID={userID} modal={modal} projects={projects} loading={loading}/>    
        </div>
        <div ref={deleteModal} className='modal-bg'>
            <DeleteProjectModal token={token} userID={userID} modal={deleteModal} project={deleteID} loading={loading}/>
        </div>
    </>
    )
}

export default Sidebar
