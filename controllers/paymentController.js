const stripe = require("stripe")("sk_test_51QklGODKcVTNm4deVR9DXbAokVZnr07gGIdmCfgBWaILsX1GDsieF4skbZKYdSVUsC6hf8ZEJql9ielKQPthKBr700DH7nsEyE"); // Replace with your Test Mode secret key

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
