import React, { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios"

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [ userData,setUserData ] = useState()

  const handleLogout = () => {
    setCookie("access_token", "");
  };

  useEffect(() => {
    // axios.get('http://localhost:5000/auth/singleUser', { withCredentials: true })
    axios.get('https://save-anything-backend.vercel.app/auth/singleUser', { withCredentials: true })
        .then(response => {
            console.log("Response:", response.data);
            setUserData(response.data);
        }).catch(err => {
            console.log("Navbar Error:", err);
        });
}, []);
  return (
    <>
      
      <div className="navbar">
        <div className="logo">SavedMethod</div>
        <div className="nav-links">
          <Link className="nav-link " to="/">
            Home
          </Link>
      

          <Link
            className="nav-link"
            to="/secret"
          >
            Secret
          </Link>
          <Link className="nav-link " to="/">
            {cookie.access_token && userData && userData.email }
          </Link>
          {!cookie.access_token ? (
            <Link className="nav-link login-btn" to="/login">
              Login
            </Link>
          ) : (
            <Link className="nav-link login-btn" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      </div>

    </>
  );
};

export default Navbar;
