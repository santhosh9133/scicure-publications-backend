const express = require("express");
const router = express.Router();

const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getArchiveIssuesByJournal,
} = require("../controllers/issueController");

const { verifyAdminToken } = require("../middleware/verifyToken");

// ===============================
// ISSUE ROUTES
// ===============================

// Create Issue (Admin only)
router.post("/", verifyAdminToken, createIssue);

// Get all issues (Admin / Web)
router.get("/", getAllIssues);

// Get archive format (Year → Issues)
router.get("/archive/:journalId", getArchiveIssuesByJournal);

// Get single issue by ID
router.get("/:id", getIssueById);

// Update issue (Admin only)
router.put("/:id", verifyAdminToken, updateIssue);

// Delete issue (Admin only)
router.delete("/:id", verifyAdminToken, deleteIssue);

module.exports = router;
