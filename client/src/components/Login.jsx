import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"
import { useCookies } from 'react-cookie';
import { BarLoader } from "react-spinners";

const Login = () => {
  const [ email,setEmail ] = useState("")
  const [ password,setPassword ] = useState("")
  const [ error,setError ] = useState("")
  const [ cookie,setCookie ] = useCookies(["access_token"])
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/login",{email,password})
    // axios.post("https://save-anything-backend.vercel.app/auth/login",{email,password})
    .then(result => {
      console.log(result);
      if(result.data.message === "logined"){
        setCookie("access_token",result.data.token)
        window.localStorage.setItem("usertoken",result.data.token)
        setLoading(true)
        setError("")
        navigate("/secret")
        // window.location.reload()
      } else if(result.data.message === "incorrect password"){
         setError("incorrect password")

      } else if(result.data.message === "invalid email"){
        setError("invalid email")

      } else if (result.data.message === "please fill all the fields") {
        setError("please fill all the fields")

      } else {
         console.log("something went wrong");
      }
    }).catch(err => {
      console.log("something went wrong");
      console.log(err)
    }).finally(() => {
      setLoading(false);
    })
    
  }

  

  return (
    <>
      <div className="registration-container">
        <form onSubmit={handleSubmit} className="register-container">
           <h2>Login</h2>
          
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
            <button type='submit' className='form-login-btn'> {loading ? <BarLoader color='white'/>:"Login"}</button>
            <p className='link'>Don't have an account?<Link to="/register"> Register </Link> </p>
        </form>
      </div>
    </>
  )
}

export default Login
