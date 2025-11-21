// /middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Try cookie first
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    // console.log(decoded);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute route middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
