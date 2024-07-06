import React, { useEffect, useState } from 'react'
import axios from "axios"
const Home = () => {
  
   const [ users,setUsers ] = useState([])

   useEffect(() => {
    // axios.get("http://localhost:5000/auth/users")
    axios.get("https://save-anything-backend.vercel.app/auth/users")
    .then(res => {
     console.log(res.data);
     setUsers(res.data)
    }).catch(err => {
     console.log("failed",err);
    })
   }, [])


  return (
    <>
      <div className="users-container">
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
