const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// POST route to handle subscription emails
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ✅ Use 'host' instead of 'service'
      port: 465, // ✅ SSL port
      secure: true, // ✅ Must be true for port 465
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email details
    const mailOptions = {
      from: `"Car Rental" <${process.env.EMAIL_USER}>`, // ✅ Proper sender format
      to: email, // Subscriber's email
      subject: "Subscription Confirmation - Car Rentals",
      text: `Hello,

Thank you for subscribing to Car Rentals! You will now receive the latest updates and exclusive offers.

Best regards,
Car Rentals Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    res.status(200).json({ success: true, message: "Subscription email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
