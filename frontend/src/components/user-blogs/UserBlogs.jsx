import React, { useEffect, useState } from "react";
import "./UserBlogs.css";

function UserBlogs({ userEmail, blogId }) {
  const [userBlogs, setUserBlogs] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        // Use a template literal to correctly include the userEmail variable
        const response = await fetch(
          `http://localhost:3000/api/userblogs?email=${userEmail}`
        );

        // Check if the response was successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log(data);

        console.log("Fetched user blogs:", data.data.userBlogs);

        setUserBlogs(data.data.userBlogs);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        // Optionally, handle the error by setting state
        setUserBlogs([]);
      }
    };

    // Call the fetch function only if a userEmail is provided
    if (userEmail) {
      fetchUserBlogs();
    }
  }, [userEmail]); // Add userEmail to the dependency array

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
      <div className="userblog-container">
        {/* Conditionally render the map only if userBlogs is a non-empty array */}
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
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
                <p className="card-text">
                  {truncateDescription(blog.blogDescription, 20)}
                </p>
                <div className="button-container">
                  <button className="btn btn-danger" >Delete</button>
                 
                  {/* <a href="#" className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </a> */}
                  <a href="#" className="btn btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Display a message when there are no blogs or while loading
          <p>No blogs found for this user.</p>
        )}
      </div>
    </>
  );
}

export default UserBlogs;
