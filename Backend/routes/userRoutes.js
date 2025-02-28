const express = require("express");
const { registerUser, loginUser, getUser, updateUser, deleteUser, getAllUsers } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware"); // Ensure these are correctly exported

const router = express.Router();

// ✅ User Authentication Routes
router.post("/register", registerUser);
router.post("/signin", loginUser);

// ✅ User Management Routes
router.get("/users", verifyToken, verifyAdmin, getAllUsers); // Admin-only: Get all users
router.get("/user/:id", verifyToken, getUser); // Get a single user
router.put("/user/:id", verifyToken, updateUser); // Update user details
router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser); // Admin-only: Delete user

module.exports = router;
