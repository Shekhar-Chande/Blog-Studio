import React, { useState } from "react";
import "./Dashboard.css";
import BlogForm from "../../components/blog-form/BlogForm";
import { useLocation } from "react-router-dom";
import UserBlogs from "../../components/user-blogs/UserBlogs";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  console.log("User Data:", userData);

  const [activeView, setActiveView] = useState("userBlogs");

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
  }


  return (
    <>
      <div className="main-container">
        <div className="left">
          <div className="up">
            <h6>Welcome, </h6>
            <h5>
              <b>{userData.name}</b>
            </h5>
            <button onClick={() => setActiveView("userBlogs")}>
              All Blogs
            </button>
            <button onClick={() => setActiveView("blogForm")}>
              Create Blogs
            </button>
          </div>
          <div className="down">
            <span className="logout" onClick={handleLogout}><b>Logout</b></span>
          </div>
        </div>

        <div className="right">
          {activeView === "userBlogs" ? (
            <UserBlogs userEmail={userData.email} blogId={userData._id} />
          ) : null}
          {activeView === "blogForm" ? (
            <BlogForm userEmail={userData.email} />
          ) : null}
          
        </div>
      </div>
    </>
  );
}

export default Dashboard;
