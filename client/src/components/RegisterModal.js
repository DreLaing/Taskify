import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import decode from 'jwt-decode'
import CloseIcon from '@material-ui/icons/Close'
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';

const RegisterModal = (props) => {
    const passwordRef = useRef(null)
    const history = useHistory()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const register = (e) =>{
        e.preventDefault()
        if(password.length < 6){
            alert('Password must be atleast 6 characters')
        }
        else{
            axios.post(`http://localhost:5000/login/register`, {
                username,
                password
            })
            .then(user =>{
                console.log(user.data)
                const decoded = decode(user.data)
                localStorage.setItem("userID", decoded.userID)
                localStorage.setItem("token", user.data)
                console.log(decoded.userID)
                history.push(`/user/${decoded.userID}`)
            })
            .catch(()=>{
                alert('User already exists')
            })
        }
    }
    return (
        <div className='modal edit-form'>
            <CloseIcon className='close-icon' onClick={() =>{props.modal.current.classList.remove('active'); setUsername(''); setPassword('')}}/>
            <p className='register-form-header'>Registration Form</p>
            <form onSubmit={register} className=''>
                <div className='input-row'>
                    <label htmlFor='username' className='input-icon'><FaceIcon fontSize='large' className='input-icon'/></label>
                    <input name='username' type='text' placeholder='Username (6 - 15 characters)' value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>

                <div className='input-row'>
                    <label htmlFor='password'><LockIcon fontSize='large' className='input-icon'/></label>
                    <input ref={passwordRef} name='password' type='password' placeholder='Password (6 - 15 characters)' value={password} onChange={e => setPassword(e.target.value)} required/>
                    <VisibilityIcon htmlFor='password' className='visibility-icon' onClick={()=> props.toggleVisibility()}/>
                </div>
                

                <div className='button-container'>
                    <button style={{backgroundColor:'var(--theme-color)'}} type='submit' id='login'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterModal
