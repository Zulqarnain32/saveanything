import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BarLoader } from "react-spinners";

const Home = () => {
  
   const [ users,setUsers ] = useState([])
   const [loading,setLoading] = useState(false)


   useEffect(() => {
    setLoading(true)
    // axios.get("http://localhost:5000/auth/users")
    axios.get("https://save-anything-backend.vercel.app/auth/users")
    .then(res => {
     console.log(res.data);
     setLoading(true)
     setUsers(res.data)
    }).catch(err => {
     console.log("failed",err);
    }).finally(() => {
      setLoading(true)
    })
   }, [])


  return (
    <>
      <div className="users-container">
        <BarLoader color='red'/>
        {loading && <BarLoader color='red'/>}
        {users.map((user, i) => (
          <React.Fragment key = {i}>
            <div   className="single-user">
              <h1>{user.username.toUpperCase()}</h1>
              <p>{user.email}</p>
              <button className="save-user">Save</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Home
