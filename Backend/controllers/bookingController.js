const Booking = require("../models/Booking");

// 📌 Book a Car (User)
const bookCar = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate } = req.body;

    // Validate input fields
    if (!userId || !carId || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBooking = new Booking({ userId, carId, startDate, endDate, status: "Pending" });

    await newBooking.save();
    res.status(201).json({ success: true, message: "Car booked successfully!", booking: newBooking });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 📌 Get All Bookings (Admin Only)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email") // Only fetch necessary user details
      .populate("carId", "model brand"); // Only fetch necessary car details

    res.status(200).json({ success: true, bookings });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 📌 Get Booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email")
      .populate("carId", "model brand");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });

  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 📌 Update Booking Status (Admin Only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking status updated", booking });

  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 📌 Delete a Booking (Admin Only)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully" });

  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { bookCar, getBookings, getBookingById, updateBookingStatus, deleteBooking };
