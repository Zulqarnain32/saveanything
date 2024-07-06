import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const handleLogout = () => {
    setCookie("access_token", "");
  };
  
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
