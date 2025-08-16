import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Home.css";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";


function Home() {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();
      setBlogData(data.data.fetchedBlogs);
    };
    fetchBlogs();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      <Navbar />
      <Banner/> 
      <div className="home-container">
        {blogData.map((blog) => (
          <div className="card blog-card" key={blog._id} style={{ width: "18rem" }}>
            <img src={blog.image} className="card-img-top  card-image" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                <b>{blog.blogTitle}</b>
              </h5>
              <p className="card-text">
                {truncateDescription(blog.blogDescription, 20)}
              </p>
              <a href="http://localhost:5173/blogs" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </>
  );
}

export default Home;
