import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import decode from 'jwt-decode'
import './ui/Login.css'
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RegisterModal from './RegisterModal'

const Login = () => {
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)
    const modal = useRef(null)
    const history = useHistory()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const login = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:5000/login/`, {
            username,
            password
        })
        .then(user =>{
            if(user.status === 203){
                console.log(user.status)
                passwordRef.current.classList.add('invalid')
            }
            else if(user.status === 200){
                const decoded = decode(user.data)
                localStorage.setItem("userID", decoded.userID)
                localStorage.setItem("token", user.data)
                console.log(decoded.userID)
                history.push(`/user/${decoded.userID}`)
            }
            else{
                usernameRef.current.classList.add('invalid')
            }
        })
        .catch(err => usernameRef.current.classList.add('invalid'))
    }

    const toggleVisibility = () =>{
        if(passwordRef.current.type === 'password'){
            passwordRef.current.type = 'text'
        }
        else if(passwordRef.current.type === 'text'){
            passwordRef.current.type = 'password'
        }
    }

    return (
        <div className='login-container'>
            <h1><p>Welcome to </p> <p id='taskify'> Taskify</p></h1>
            <form onSubmit={login} className='login-form'>
                <p>Sign In</p>
                <div className='input-row'>
                    <label htmlFor='username'><FaceIcon fontSize='large' /></label>
                    <input onFocus={()=> usernameRef.current.classList.remove('invalid')} ref={usernameRef} name='username' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>

                <div className='input-row'>
                    <label htmlFor='password'><LockIcon fontSize='large' /></label>
                    <input onFocus={()=> passwordRef.current.classList.remove('invalid')} ref={passwordRef} name='password' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    <VisibilityIcon htmlFor='password' className='visibility-icon' onClick={()=> toggleVisibility()}/>
                </div>
                

                <div className='button-container'>
                    <button type='submit' id='login'>Login</button>
                </div>
                <span>Don't have an account? <span onClick={()=> modal.current.classList.add('active')}>Register</span></span>
            </form>

            <div ref={modal} className='modal-bg'>
                <RegisterModal modal={modal} toggleVisibility={toggleVisibility}/>
            </div>
        </div>
    )
}

export default Login
