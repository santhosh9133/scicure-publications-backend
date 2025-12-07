const mongoose = require("mongoose");

// ==============================
// ARTICLE SCHEMA
// ==============================

const articleSchema = new mongoose.Schema(
  {
    // Auto-generated Article ID: ART0001
    articleId: {
      type: String,
      unique: true,
    },

    articleTitle: {
      type: String,
      required: true,
    },

    // Journal Reference (Dropdown)
    journalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },

    authorEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    articleType: {
      type: String,
      enum: [
        "Research",
        "Review",
        "Case Study",
        "Short Communication",
        "Editorial",
        "Other",
      ],
      required: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    keywords: {
      type: String,
      required: true,
    },

    doiNumber: {
      type: String,
      default: "",
    },

    submissionDate: {
      type: Date,
      required: true,
    },

    acceptanceDate: {
      type: Date,
    },

    publicationDate: {
      type: Date,
    },

    volumeNumber: {
      type: String,
      required: true,
    },

    issueNumber: {
      type: String,
      required: true,
    },

    pageRange: {
      type: String,
      // required: true,
    },

    articleFile: {
      type: String, // File path
      required: true,
    },

    coverImage: {
      type: String, // Optional
      default: "",
    },

    articleStatus: {
      type: String,
      enum: ["Under Review", "Accepted", "Published", "Rejected"],
      default: "Under Review",
    },

    publisherName: {
      type: String,
      default: "SciCure Publications",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // For createdAt & updatedAt
  }
);

// ==============================
// AUTO-GENERATE ARTICLE ID
// ==============================
articleSchema.pre("save", async function (next) {
  if (this.articleId) return next();

  try {
    const lastArticle = await this.constructor.findOne().sort({ _id: -1 });

    let newNumber = 1;

    if (lastArticle && lastArticle.articleId) {
      const lastNum = parseInt(lastArticle.articleId.replace("ART", ""));
      newNumber = lastNum + 1;
    }

    this.articleId = "ART" + newNumber.toString().padStart(4, "0");

    next();
  } catch (err) {
    next(err);
  }
});

// ==============================
// EXPORT MODEL
// ==============================
module.exports = mongoose.model("Article", articleSchema);
