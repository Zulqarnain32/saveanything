import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"


const Registration = () => {
  const [ username,setUserName ] = useState("")
  const [ email,setEmail ] = useState("")
  const [ password,setPassword ] = useState("")
  const [ error,setError ] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:5000/auth/register",{username,email,password})
    axios.post("https://save-anything-backend.vercel.app/auth/register",{username,email,password})
    .then(result => {
      if(result.data.message === "successfully register"){
         setError("")
         navigate("/login")

      } else if(result.data.message === "email already exist"){
         setError("email already exist")
      }else if(result.data.message === "please fill all the fields"){
        setError("please fill all the fields")
      }
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <div className="registration-container">
        <form onSubmit={handleSubmit} className="register-container">
           <h2>Registration</h2>
           <p>Username</p>
           <input 
             type="text" 
             placeholder='Username'
             className='input-field'
             onChange={(e) => setUserName(e.target.value)}
            />
             <p>Email</p>
           <input 
             type="email" 
             placeholder='Email'
             className='input-field'
             onChange={(e) => setEmail(e.target.value)}
            />
             <p>Password</p>
           <input 
             type="password" 
             placeholder='Password'
             className='input-field'
             onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error">{error}</div>
            <button type='submit' className='form-login-btn'>Register</button>
            <p className='link'>Alredy have an account?<Link to="/login"> Login </Link> </p>
        </form>
      </div>
    </>
  )
}

export default Registration
