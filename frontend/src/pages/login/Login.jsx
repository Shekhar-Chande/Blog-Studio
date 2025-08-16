import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
// import Navbar from "../../components/Navbar/Navbar";


function Login() {
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/usersignin",
        formData
      );
      setFormData({
        email: "",
        password: "",
      });

      localStorage.setItem("token", res.data.token);

      const userData = {
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        token: res.data.token,
      };

      navigate("/dashboard", { state: userData });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = "User not found or invalid credentials";
        setAlertMessage(errorMessage);
        setAlertVisible(true);
      } else {
        console.log("Error:", err);
      }
    }
  }

  const closeAlert = () => {
    setAlertVisible(false);
    setAlertMessage("");
    // Reset form data if needed
    // This is optional, depending on your UX preference
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />
      <div>
        
        <div className="login-container">
          <h1>Login</h1>
          <form action="" className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email...."
            />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password...."
            />
            <button>Login</button>
          </form>

          <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Signup</span>
          </p>
        </div>

        </div>

        
        {alertVisible && (
          <div className="custom-alert-overlay">
            <div className="custom-alert-box">
              <p>{alertMessage}</p>
              <button onClick={closeAlert}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
