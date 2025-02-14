import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not loaded yet.");
      setIsProcessing(false);
      return;
    }

    if (!amount || amount <= 0) {
      setErrorMessage("Invalid payment amount. Please try again.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Unauthorized: No token found. Please log in.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      });

      if (!response.ok) {
        throw new Error(`Payment failed: ${response.status} - ${response.statusText}`);
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User" },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setPaymentSuccess(false);
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        setErrorMessage(null);

        await fetch("http://localhost:5000/api/payment/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
            amount: amount,
          }),
        });
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="border-2 rounded-lg shadow-lg p-8 w-full max-w-sm bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-900">Payment</h2>

        <CardElement
          className="p-3 border rounded mb-4 text-black"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {paymentSuccess && <p className="text-green-500 text-sm">Payment Successful!</p>}

        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className={`w-full py-2 mt-4 bg-orange-900 text-white rounded hover:bg-orange-800 transition ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
