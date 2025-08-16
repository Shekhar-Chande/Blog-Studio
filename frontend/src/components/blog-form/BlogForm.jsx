import React, { use, useRef, useState } from "react";
import "./BlogForm.css"; // Import the CSS file
import axios from "axios";


const BlogForm = ({ userEmail }) => {

  const emailRef = useRef(userEmail);
  const [formData, setFormData] = useState({
    email: emailRef.current,
    authorName: "",
    blogTitle: "",
    blogDescription: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the file object itself
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("email", formData.email);
    newFormData.append("authorName", formData.authorName);
    newFormData.append("blogTitle", formData.blogTitle);
    newFormData.append("blogDescription", formData.blogDescription);

    // Append the actual file object
    if (formData.image) {
      newFormData.append("image", formData.image);
    }

    try {
      const formDataToSend = await axios.post(
        "http://localhost:3000/api/blogs",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important header for file uploads
          },
        }
      );

       
      alert("Blog published successfully!");
        setFormData({
          authorName: "",
          blogTitle: "",
          blogDescription: "",
          image: null,
        })
      

      e.target.reset(); // Reset the form fields after submission
    } catch (err) {
      console.error("Error publishing blog:", err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>Create a New Blog Post</h2>

        <div className="form-group">
          <label htmlFor="authorName">Author's Name</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="blogTitle">Blog Title</label>
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="blogDescription">Blog Description</label>
          <textarea
            id="blogDescription"
            name="blogDescription"
            rows="10"
            value={formData.blogDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Blog Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Publish Blog
        </button>
      
      </form>
    </div>
  );
};

export default BlogForm;
