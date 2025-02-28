const express = require("express");
const multer = require("multer");
const Car = require("../models/Car"); // Ensure correct path to Car model

const router = express.Router();

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Route to Add a New Car with Image Upload
  router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, brand, price, availability } = req.body;
    const image = req.file ? req.file.filename : null; // Get uploaded image

    if (!name || !brand || !price || !availability || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCar = new Car({ name, brand, price, image, availability });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// Export Routes


//router.get("/", getCars);
//router.post("/", addCar);

module.exports = router;
