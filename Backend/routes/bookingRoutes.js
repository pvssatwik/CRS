const express = require("express");
const Booking = require("../models/Booking");
const { verifyAdmin, verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Get all bookings (Admin Only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
});

// 📌 Update booking status (Admin Only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking updated", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Error updating booking" });
  }
});

// 📌 Delete a booking (Admin Only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
});

// 📌 Book a Car (User)
router.post("/book-car", verifyToken, async (req, res) => {
  const { customerName, carModel, pickupDate, returnDate } = req.body;

  if (!customerName || !carModel || !pickupDate || !returnDate) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newBooking = new Booking({
      customerName,
      carModel,
      pickupDate,
      returnDate,
      status: "Pending", // Default status
    });

    await newBooking.save();
    res.status(201).json({ success: true, message: "Car booked successfully!", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Failed to book car" });
  }
});

module.exports = router;
