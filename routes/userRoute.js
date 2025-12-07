const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware"); // your image upload middleware
const { verifyAdminToken } = require("../middleware/verifyToken");
const userController = require("../controllers/userController");

// REGISTER
router.post(
  "/register",
  upload.single("profilePic"),
  verifyAdminToken,
  userController.registerUser
);

// LOGIN
router.post("/login", verifyAdminToken, userController.loginUser);

// Create user (form-data + image upload)
router.post(
  "/create",
  upload.single("journalImage"),
  verifyAdminToken,
  userController.createUser
);

// Get all users
router.get("/", verifyAdminToken, userController.getUsers);

// Get single user
router.get("/:id", verifyAdminToken, userController.getUserById);

// Update user (with optional new image)
router.put(
  "/update/:id",
  upload.single("journalImage"),
  userController.updateUser
);

// Delete user
router.delete("/delete/:id", verifyAdminToken, userController.deleteUser);

module.exports = router;
