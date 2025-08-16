import React, { use, useState } from "react";
import "./Blogs.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Blogs() {
  const [blogs, setBlogs] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchedBlogs = async () => {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();
      setBlogs(data.data.fetchedBlogs);
    };

    fetchedBlogs();
  }, []);

function handleClick(blog) {
  navigate(`/read/${blog._id}`,{ state: {blog} });
}



  return (
    <>
      <div className="blogs-main-container">
        <div className="head">
          <span onClick={()=> navigate("/")}>HomePage</span>
          <input type="text" placeholder="Search Your Blogs Here......." />
        </div>
        <div className="all-blogs-container">
          {blogs.map((blog) => (
            <div
              className="card blog-card"
              key={blog._id}
              style={{ width: "18rem" }}
            >
              <img
                src={blog.image}
                className="card-img-top  card-image"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>{blog.blogTitle}</b>
                </h5>
                <button className="btn btn-primary" onClick={()=> handleClick(blog)}> Read More</button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
