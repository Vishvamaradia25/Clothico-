import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate(); 

  // Form validation logic
  const validate = () => {
    const errors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    // Name validation
    if (!name) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email format is invalid";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      alert("Error creating an account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200">
  <div className="bg-orange-700 rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all duration-700 ease-in-out hover:scale-105">
    <h2 className="text-xl font-bold text-white text-center mb-4 animate-fade-in">
      Create an Account
    </h2>
    <form onSubmit={handleSubmit} className="animate-slide-up">
     
      <div className="mb-3">
        <label htmlFor="name" className="block text-white font-bold text-sm">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-200 text-sm"
        />
        {errors.name && <p className="text-white text-xs">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="email" className="block text-white font-bold text-sm">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-200 text-sm"
        />
        {errors.email && <p className="text-white text-xs">{errors.email}</p>}
      </div>

      
      <div className="mb-3">
        <label htmlFor="password" className="block text-white font-bold text-sm">
          Password
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-200 text-sm"
          />
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {isPasswordVisible ? (
              <i className="fa fa-eye-slash text-white"></i>
            ) : (
              <i className="fa fa-eye text-black"></i>
            )}
          </span>
        </div>
        {errors.password && <p className="text-white text-xs">{errors.password}</p>}
      </div>

      
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-white font-bold text-sm">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition duration-200 text-sm"
          />
          <span
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {isConfirmPasswordVisible ? (
              <i className="fa fa-eye-slash text-white"></i>
            ) : (
              <i className="fa fa-eye text-black"></i>
            )}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-white text-xs">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-900 text-white font-bold py-1.5 px-4 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-blue-900 transform transition duration-300 hover:scale-105 text-sm"
      >
        Sign Up
      </button>
    </form>
    <p className="text-white text-xs text-center mt-2">
      Already have an account?{" "}
      <Link to="/login" className="text-gray-800 font-bold hover:underline">
        Login
      </Link>
    </p>
  </div>
</div>

  );
};

export default SignUpPage;
