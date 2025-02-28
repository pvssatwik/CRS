// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    // Remove "Bearer " if present
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    
    req.user = decoded; // Store user details in request
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid Token", error: error.message });
  }
};

const verifyAdmin = (req, res, next) => {
  // Check if token exists and if user is an admin
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access Denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };

