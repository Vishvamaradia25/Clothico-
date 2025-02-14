import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";


const stripePromise = loadStripe("pk_test_51QklGODKcVTNm4deHLhwcef5uUvlCqBiuwR9NVUwESnoT5hJod7zfeAVRaHlotvfTo1qRR98Uk1RVZzxhFBaMuHA00YFBKCqbv");

const PaymentPage = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔹 Retrieved JWT Token:", token);
    console.log("🔹 Sending amount to backend:", amount);

    if (!token) {
      console.error("❌ No JWT token found in localStorage.");
      setError("Unauthorized: Please log in to continue.");
      return;
    }

    fetch("http://localhost:5000/api/payment/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Received response:", data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("❌ Failed to load client secret:", data);
          setError("Failed to load payment details. Please try again.");
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching client secret:", error);
        setError("Something went wrong while processing payment.");
      });
  }, [amount]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full relative">
       

        {error ? (
          <p className="text-red-500 text-center mt-6">{error}</p>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={amount} />
          </Elements>
        ) : (
          <p className="text-center text-gray-600 mt-6">Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

