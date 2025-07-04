// jwtFilter.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // adjust path if needed

exports.checkRequest = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ status: false, message: "Token missing from request header" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("+password");

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    req.user = user; //  Attach user to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Token verification failed" });
  }
};

