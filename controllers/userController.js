const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER / CREATE USER
exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, mobile, role } = req.body;
    const journalImage = req.file ? `/uploads/${req.file.filename}` : "";

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({
      userName,
      email,
      password,
      mobile,
      role,
      journalImage,
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        journalImage: user.journalImage,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        journalImage: user.journalImage,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create User (with image upload)
exports.createUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      mobile,
      role,
      journalName,
      journalTitle,
      journalISSN,
      journalDescription,
    } = req.body;

    const journalImage = req.file ? req.file.filename : "";

    const user = new User({
      userName,
      email,
      password,
      mobile,
      role,
      journalName,
      journalTitle,
      journalISSN,
      journalDescription,
      journalImage,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get users for web
exports.getWebUsers = async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "admin" } },
      "_id journalId journalName journalTitle journalISSN journalDescription journalImage status"
    );

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single User for Web (Public)
exports.getWebUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 
      "_id journalId journalName journalTitle journalISSN journalDescription journalImage status acronym"
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update User (with optional image)
exports.updateUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      mobile,
      role,
      journalImage,
      journalName,
      journalTitle,
      journalISSN,
      journalCategory,
      journalDescription,
      status,
    } = req.body;

    const updateData = {
      userName,
      email,
      password,
      mobile,
      role,
      journalImage,
      journalName,
      journalTitle,
      journalISSN,
      journalCategory,
      journalDescription,
      status,
    };

    if (req.file) {
      updateData.journalImage = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
