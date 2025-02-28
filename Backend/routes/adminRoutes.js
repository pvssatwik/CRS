const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Ensure the path is correct
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/userController");
require("dotenv").config();

const router = express.Router();

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: "admin" }, // Add role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with token
    res.json({ token, message: "Login successful" });

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get All Users (Admin-Only)
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

// ✅ Delete User (Admin-Only)
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
