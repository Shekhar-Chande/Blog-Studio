import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../../src/assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleSignup() {
    navigate("/signup");
  }

  function handleHome() {
    navigate("/");
  }

  return (
    <>
      <header className=" header">
        <img onClick={handleHome} src={Logo} alt="" style={{ width: "70px" }} className="logo-img" />

        <div className="nav">
          <ul>
            <li onClick={()=> navigate('/')}>Home</li>
            <li onClick={()=> navigate('/blogs')}>Blogs</li>
            <li>Contact-Us</li>
          </ul>
        </div>
          


        <div className="btn-container">
          <div className="">
            <div class="">
              
              <button
                type="button"
                onClick={handleLogin}
                className="btn btn-outline-light me-2"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleSignup}
                className="btn btn-warning"
              >
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>

 
    </>
  );
}

export default Navbar;
