import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
  const[username, setUsername]= useState("");
  const[password, setPassword]= useState("");
  const navigate= useNavigate();
  const handleLogin= ()=>{
    if(username=== "admin" && password=== "1234"){
      navigate('/Main')
    }
    else{
      alert("Invalid Username or Password")
    }
  } 
  return (
    <div className='login-bg'>
        <section className="login-form">
            <h1 className="login-heading">Foody Zone</h1>
            <h3 className="username">Username</h3>
            <input 
            className='input-login' 
            type="text" 
            placeholder='Enter Username'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
            <h3 className="username">Password</h3>
            <input 
            className='input-login' 
            type="password" 
            placeholder='Enter Password'
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            />
            <div className="btn">
            <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </section>
    </div>
  )
}

export default Login
