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
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email format" });
    }

    //  check password length
    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        message: "Password must be at least 6 characters long",
      });
    }

    // check user already existed in database
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ error: true, message: "Email already in use" });
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

    // Generate token + send response
    generateToken(user._id, res);

    return res.status(201).json({
      error: false,
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Required fields
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and password are required",
      });
    }

    // 2) Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    // 3) Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    if (!user || !isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    // 4) Generate JWT token
    generateToken(user._id, res);

    // 5) Send success response
    return res.status(200).json({
      error: false,
      message: "Logged in successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
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
      .json({ error: false, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// //  * Get current user (protected)
// export const getMe = async (req, res, next) => {
//   try {
//     // authMiddleware attaches req.userId
//     const user = await User.findById(req.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ user });
//   } catch (error) {
//     console.error("Error in getCurrentUser: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
