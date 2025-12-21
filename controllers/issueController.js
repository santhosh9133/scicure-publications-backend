const Issue = require("../models/issueModel");
const Article = require("../models/articlesModel");
const mongoose = require("mongoose");

// ===============================
// CREATE ISSUE
// ===============================
exports.createIssue = async (req, res) => {
  try {
    const { journalId, year, volume, issue } = req.body;

    if (!year || !volume || !issue) {
      return res.status(400).json({
        success: false,
        message: "Year, Volume and Issue are required",
      });
    }

    const newIssue = await Issue.create({ journalId, year, volume, issue });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      issue: newIssue,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This Volume & Issue already exists for the year",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL ISSUES
// ===============================
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({
      year: -1,
      volume: -1,
      issue: -1,
    });

    res.status(200).json({
      success: true,
      total: issues.length,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ISSUE BY ID
// ===============================
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE ISSUE
// ===============================
exports.updateIssue = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE ISSUE (SAFE DELETE)
// ===============================
exports.deleteIssue = async (req, res) => {
  try {
    // ❗ Prevent deleting issue if articles exist
    const articleCount = await Article.countDocuments({
      issueId: req.params.id,
    });

    if (articleCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete issue with articles",
      });
    }

    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

    if (!deletedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ARCHIVE ISSUES (YEAR → ISSUES)
// ===============================
exports.getArchiveIssuesByJournal = async (req, res) => {
  try {
    const { journalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(journalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid journalId",
      });
    }

    const issues = await Issue.find({ journalId })
      .sort({ year: -1, volume: -1, issue: -1 })
      .lean();

    const archiveMap = new Map();

    issues.forEach((item) => {
      if (!archiveMap.has(item.year)) {
        archiveMap.set(item.year, []);
      }

      archiveMap.get(item.year).push({
        _id: item._id,
        volume: item.volume,
        issue: item.issue,
        publishedDate: item.publishedDate,
      });
    });

    // Convert Map → Array (order preserved)
    const archive = Array.from(archiveMap, ([year, issues]) => ({
      year,
      issues,
    }));

    res.status(200).json({
      success: true,
      journalId,
      archive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
