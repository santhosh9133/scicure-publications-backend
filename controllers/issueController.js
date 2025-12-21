const Issue = require("../models/issueModel");

exports.createIssue = async (req, res) => {
  try {
    const { year, volume, issue } = req.body;

    const newIssue = await Issue.create({ year, volume, issue });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      issue: newIssue,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This Volume & Issue already exists",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
