import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Blogs from "./pages/blogs/Blogs";
import Read from "./pages/read/Read";


function App() {
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path="/"  element={ <Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/read/:id" element={<Read/>}/>

      <Route path="/dashboard" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />
    </Routes>

  
  </BrowserRouter>



     
    </>
  );
}

export default App;
