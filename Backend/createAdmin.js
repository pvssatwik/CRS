require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
const connectDB = require("./config/db"); // ✅ Import database connection

const createAdmin = async () => {
  try {
    await connectDB(); // ✅ Connect to MongoDB

    const existingAdmin = await Admin.findOne({ email: "pvssatwik1@gmail.com" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists!");
      return;
    }

    // ✅ New password to hash
    const newPassword = "Satwik@549"; // Change this password as needed
    const hashedPassword = await bcrypt.hash(newPassword, 12); // Stronger hashing with saltRounds = 12

    const newAdmin = new Admin({
      username: "pvssatwik",
      email: "pvssatwik1@gmail.com",
      password: hashedPassword, // ✅ Store hashed password
    });

    await newAdmin.save();
    console.log("✅ New Admin user created successfully with updated password!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close(); // ✅ Close DB connection after operation
  }
};

createAdmin();
