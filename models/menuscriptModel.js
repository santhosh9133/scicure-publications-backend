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
    mobile: {
      type: String,
      // required: true,
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
    journalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you already have a Journal model
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
