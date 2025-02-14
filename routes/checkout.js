const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware"); 
const Delivery = require("../models/Delivery"); 

// Save delivery details
router.post("/delivery", verifyToken, async (req, res) => {
  try {
    const { name, address, city, state, zip } = req.body;

    if (!name || !address || !city || !state || !zip) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const deliveryDetails = new Delivery({
      userId: req.user.id, 
      name,
      address,
      city,
      state,
      zip,
    });

    await deliveryDetails.save();
    res.status(201).json({ message: "Delivery details saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
