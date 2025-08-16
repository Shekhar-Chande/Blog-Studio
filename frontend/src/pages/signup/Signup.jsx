import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import "./Signup.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"; // Import Navbar if needed

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: nanoid(),
    name: "",
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
    console.log("Form Data Submitted ", formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/usersignup",
        formData
      );
      alert("Account created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      console.log("Registration Failed");
    }
  }

  return (
    <>
      <Navbar />
      <div className="signup-main-container">
        <div className="signup-container">
          <h1>Create an Account </h1>
          <p>Join us to share your thoughts and ideas!</p>
          <div>
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name....."
              />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password.."
              />
              <button>Signup</button>
            </form>
             <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

// import { useState } from "react";
// import { nanoid } from "nanoid";
// import axios from "axios";

// function Signup() {
//   const [formData, setFormData] = useState({
//     id: nanoid(),
//     name: "",
//     email: "",
//     password: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Form Data Submitted ", formData);

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/usersignup",
//         formData
//       );
//       alert("Account created successfully");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
//     } catch (err) {
//       console.log("Registration Failed");
//     }
//   }

//   return (
//     <>
//       <div>
//         <div>
//           <form action="" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Your Name....."
//             />
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your username"
//             />
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter Password.."
//             />
//             <button>Signup</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;
