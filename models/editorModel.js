const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
  {
    journalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you already have a Journal model
      required: true,
    },

    editorName: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    profileImage: {
      type: String, // Will store uploaded file path/url
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Editor", editorSchema);
