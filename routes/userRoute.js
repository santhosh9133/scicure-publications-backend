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
router.post("/login", userController.loginUser);

// Create user (form-data + image upload)
router.post(
  "/create",
  upload.fields([
    { name: "journalImage", maxCount: 1 },
    { name: "journalBgImage", maxCount: 1 },
  ]),
  verifyAdminToken,
  userController.createUser
);

// Get all users
router.get("/", verifyAdminToken, userController.getUsers);

// Get Users for Web
router.get("/web", userController.getWebUsers);

// Get Single User for Web
router.get("/web/:id", userController.getWebUserById);

// Get single user
router.get("/:id", verifyAdminToken, userController.getUserById);

// Update user (with optional new image)
router.put(
  "/update/:id",
  upload.fields([
    { name: "journalImage", maxCount: 1 },
    { name: "journalBgImage", maxCount: 1 },
  ]),
  verifyAdminToken,
  userController.updateUser
);

// Delete user
router.delete("/delete/:id", verifyAdminToken, userController.deleteUser);

module.exports = router;
