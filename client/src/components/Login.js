import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import decode from 'jwt-decode'

const Login = () => {
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
            const decoded = decode(user.data)
            localStorage.setItem("userID", decoded.userID)
            localStorage.setItem("token", user.data)
            console.log(decoded.userID)
            history.push(`/user/${decoded.userID}`)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={login}>
                <input name='username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor='username'>Username</label>

                <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <label htmlFor='password'>Password</label>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
