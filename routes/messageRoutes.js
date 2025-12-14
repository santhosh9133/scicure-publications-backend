const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateStatus,
  deleteMessage,
} = require("../controllers/messageController");

// Public route (Contact form)
router.post("/", createMessage);

// Admin routes
router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteMessage);

module.exports = router;
