// /utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // create token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  // set secure cookie (in production set secure:true and sameSite appropriately)
  const cookieOptions = {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax", // CSRF attacks cross-site request forgery attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days.
  };

  res.status(200).cookie("token", token, cookieOptions);
};

export default generateToken;
