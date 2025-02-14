const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); 
const mongoose = require("mongoose"); 
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require("dotenv").config();

// Validate env
const requiredEnvVars = ["STRIPE_SECRET_KEY", "CLIENT_URL", "JWT_SECRET", "MONGODB_URI", "PORT"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: ${key} is not defined in the .env file.`);
    process.exit(1);
  }
});


connectDB().catch((err) => {
  console.error("Database connection failed:", err.message);
  process.exit(1);
});

const app = express();


app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));

// Contact Schema & Model
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Contact Route (Save Form Data)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (error) {
    console.error("🔥 Error saving contact message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

//  404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
