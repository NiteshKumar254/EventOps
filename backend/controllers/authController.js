
import User from "../models/User.js";
import jwt from "jsonwebtoken";
// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
//  REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create user (password will be hashed automatically)
    const user = await User.create({  name,  email, password,
      role: role || "attendee", // default to attendee if not provided
    });
    const token = generateToken(user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//  LOGIN USER
export const loginUser = async (req, res) => {
  try { const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({ _id: user._id, name: user.name, email: user.email, role: user.role,  token, });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
