import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Read.css";

function Read() {
  const [read, setRead] = useState([]);
  const { id } = useParams();
  const readData = location.state;
  console.log(id);

  useEffect(() => {
    const fetchedBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setRead(data.data.fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchedBlog();
  }, []);

  return (
    <>
      <Navbar />

      <div className="read-container">
      <div className="read-main-container">
        <div className="title">
            <h1>{read.blogTitle}</h1>
        </div>
        <div className="author">
            <img src={read.image} alt="" />
            <h6>Author: {read.authorName}</h6>
        </div>

        <div className="description">
            <p>{read.blogDescription}</p>
        </div>

        <div className="date">
            <p>Published on: {new Date(read.createdAt).toLocaleDateString()}</p>

        </div>
      </div>
      </div>
    </>
  );
}

export default Read;
