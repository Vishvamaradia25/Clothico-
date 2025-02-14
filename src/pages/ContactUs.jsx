import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
    
      <div className="relative w-full h-auto min-h-screen">
       
        <img
          src="/assets/banner5.png"
          alt="Contact Us Banner"
          className="w-full h-full min-h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

       
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-6 px-4">
          <h2 className="text-white text-4xl md:text-6xl font-bold mt-10">Contact Us</h2>

         
          <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-sm h-auto mt-4">
            <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">Get in Touch</h2>

            {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-orange-900 text-white w-full py-2 rounded-md hover:bg-orange-800 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


