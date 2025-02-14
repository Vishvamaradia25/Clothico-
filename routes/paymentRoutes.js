const express = require("express");
const stripe = require("stripe")("sk_test_51QklGODKcVTNm4deVR9DXbAokVZnr07gGIdmCfgBWaILsX1GDsieF4skbZKYdSVUsC6hf8ZEJql9ielKQPthKBr700DH7nsEyE"); // Use environment variable
const { verifyToken } = require("../middleware/authMiddleware");
const Payment = require("../models/Payment"); 
const router = express.Router();

router.post("/create-intent", verifyToken, async (req, res) => {
  try {
   
    const { amount } = req.body;

    if (!amount) {
      console.error("Error: Payment amount is missing.");
      return res.status(400).json({ error: "Payment amount is required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: "inr",
      payment_method_types: ["card"],
    });

    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message || "Something went wrong." });
  }
});

router.post("/confirm-payment", verifyToken, async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;

    if (!paymentIntentId || !amount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    
    const paymentRecord = new Payment({
      userId: req.user.id,
      paymentIntentId,
      amount: parseFloat(amount), 
      status: "succeeded",
    });

    await paymentRecord.save();
    res.status(200).json({ message: "Payment stored successfully" });
  } catch (error) {
    console.error("Error storing payment:", error);
    res.status(500).json({ error: error.message || "Error storing payment." });
  }
});

module.exports = router;
