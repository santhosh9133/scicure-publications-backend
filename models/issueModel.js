const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    issue: {
      type: Number,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate Volume + Issue in same year
issueSchema.index({ year: 1, volume: 1, issue: 1 }, { unique: true });

module.exports = mongoose.models.Issue || mongoose.model("Issue", issueSchema);
