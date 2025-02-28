const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Create this model

// Route to handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    // Validate input
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Save to MongoDB
    const newContact = new Contact({ fullName, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
