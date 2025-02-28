const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store filename of the uploaded image
  availability: { type: String, enum: ["Available", "Not Available"], required: true }
});

module.exports = mongoose.model("Car", CarSchema);
