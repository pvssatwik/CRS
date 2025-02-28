const Car = require("../models/Car");

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new car
const addCar = async (req, res) => {
  try {
    const { name, brand, price, image, availability } = req.body;
    const newCar = new Car({ name, brand, price, image, availability });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getCars, addCar };
