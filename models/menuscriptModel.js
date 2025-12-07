const mongoose = require("mongoose");

const manuscriptSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    postalAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    journalName: {
      type: String,
      ref: "Journal",
      required: true,
    },
    articleType: {
      type: String,
      enum: [
        "Original",
        "Review",
        "Case Reports",
        "Editorials",
        "Commentaries",
        "Corrigendum",
        "Expert Opinions",
        "Letters",
        "Perspectives",
      ],
      required: true,
    },

    menuscriptTitle: {
      type: String,
      required: true,
      trim: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    manuscriptFile: {
      type: String, // file path
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manuscript", manuscriptSchema);
