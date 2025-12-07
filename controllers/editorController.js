const Editor = require("../models/editorModel");
const User = require("../models/userModel");

// ===============================
// CREATE EDITOR
// ===============================
exports.createEditor = async (req, res) => {
  try {
    const profileImage = req.file ? req.file.filename : "";

    const newEditor = new Editor({
      journalId: req.body.journalId,
      editorName: req.body.editorName,
      designation: req.body.designation,
      institution: req.body.institution,
      country: req.body.country,
      email: req.body.email,
      profileImage: profileImage,
    });

    await newEditor.save();

    res.status(201).json({
      message: "Editor added successfully",
      data: newEditor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL EDITORS
// ===============================
exports.getAllEditors = async (req, res) => {
  try {
    const editors = await Editor.find().populate(
      "journalId",
      "journalName journalId"
    );

    res.status(200).json(editors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET EDITOR BY ID
// ===============================
exports.getEditorById = async (req, res) => {
  try {
    const editor = await Editor.findById(req.params.id);

    if (!editor) {
      return res.status(404).json({ message: "Editor not found" });
    }

    res.status(200).json(editor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// UPDATE EDITOR
// ===============================
exports.updateEditor = async (req, res) => {
  try {
    const profileImage = req.file ? req.file.filename : undefined;

    const updatedData = {
      journalId: req.body.journalId,
      editorName: req.body.editorName,
      designation: req.body.designation,
      institution: req.body.institution,
      country: req.body.country,
      email: req.body.email,
    };

    if (profileImage) updatedData.profileImage = profileImage;

    const updatedEditor = await Editor.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedEditor) {
      return res.status(404).json({ message: "Editor not found" });
    }

    res.status(200).json({
      message: "Editor updated successfully",
      data: updatedEditor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE EDITOR
// ===============================
exports.deleteEditor = async (req, res) => {
  try {
    const deletedEditor = await Editor.findByIdAndDelete(req.params.id);

    if (!deletedEditor) {
      return res.status(404).json({ message: "Editor not found" });
    }

    res.status(200).json({
      message: "Editor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
