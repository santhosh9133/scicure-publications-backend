const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware"); // your image upload middleware
const { verifyAdminToken } = require("");
const userController = require("../controllers/userController");

// REGISTER
router.post(
  "/register",
  upload.single("profilePic"),
  userController.registerUser
);

// LOGIN
router.post("/login", userController.loginUser);

// Create user (form-data + image upload)
router.post(
  "/create",
  upload.single("journalImage"),
  userController.createUser
);

// Get all users
router.get("/", userController.getUsers);

// Get single user
router.get("/:id", userController.getUserById);

// Update user (with optional new image)
router.put(
  "/update/:id",
  upload.single("journalImage"),
  userController.updateUser
);

// Delete user
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
