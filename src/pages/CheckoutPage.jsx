import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0; 

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, state, zip } = formData;

    if (!name || !address || !city || !state || !zip) {
      setError("All fields are required.");
      return;
    }

    setError("");
    

    navigate("/payment", { state: { amount } }); 
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 items-center text-orange-900">Checkout</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-orange-900">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-orange-800 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-orange-900">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-orange-800 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-orange-900">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-orange-800 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-orange-900">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-orange-800 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-orange-900">Zip Code</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border border-orange-800 rounded p-2"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-50 bg-orange-900 hover:bg-orange-800 text-white py-2 px-4 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
