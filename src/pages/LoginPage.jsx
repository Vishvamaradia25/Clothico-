import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email regex pattern
  
    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  
    // Password validation
    if (!password) {
      errors.password = "Password is required";
    }
  
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(); 
    setErrors(validationErrors); 

    // If validation errors, don't submit the form
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store the token in local storage 
      localStorage.setItem("token", response.data.token);

     
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200">
      <div className="bg-orange-700 rounded-lg shadow-lg p-8 max-w-sm w-full transform transition-all duration-700 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-white text-center mb-6 animate-fade-in">
          Welcome to Clothico
        </h2>
        <form onSubmit={handleSubmit} className="animate-slide-up">
        
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900 transition duration-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

         
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-white font-bold">
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-900 transition duration-200"
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
              className="absolute right-3 top-1/2 transform -translate-y-1/5 cursor-pointer"
            >
              {isPasswordVisible ? (
                <i className="fa fa-eye-slash text-black text-xl"></i> 
              ) : (
                <i className="fa fa-eye text-black text-xl"></i> 
              )}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-orange-900 transform transition duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-white text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-800 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
