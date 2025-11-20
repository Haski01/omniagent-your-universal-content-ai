import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
export const signup = async (req, res) => {
  try {
    // fetch userData from req.body
    const { fullName, email, password } = req.body;

    // all field are required
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //  check password length
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // check user already existed in database
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //  create new user to db
    const user = await User.create({
      fullName,
      email,
      password: hashed,
    });

    if (user) {
      // Send token in HttpOnly cookie and response for convenience
      generateToken(user._id, res);

      // send response to frontend
      res.status(201).json({ message: "User created", user: user.toJSON() });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // check user already exist or not
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!user || !isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    // generate and set jwt token
    generateToken(user._id, res);

    // send response to frontend
    res.status(200).json({ message: "Logged in", user: user.toJSON() });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout - clear cookie
export const logout = (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  * Get current user (protected)
export const getMe = async (req, res, next) => {
  try {
    // authMiddleware attaches req.userId
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    console.error("Error in getCurrentUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
