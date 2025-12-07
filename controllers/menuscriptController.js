const Manuscript = require("../models/menuscriptModel");

// CREATE Manuscript (Form Data)
exports.createManuscript = async (req, res) => {
  try {
    const {
      authorName,
      email,
      postalAddress,
      country,
      journalName,
      articleType,
      menuscriptTitle,
      abstract,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Manuscript file is required" });
    }

    const manuscript = new Manuscript({
      authorName,
      email,
      postalAddress,
      country,
      journalName,
      articleType,
      menuscriptTitle,
      abstract,
      manuscriptFile: req.file.filename, // File path from multer
    });

    const savedData = await manuscript.save();

    res.status(201).json({
      message: "Manuscript submitted successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error creating manuscript:", error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

// GET all manuscripts
exports.getAllManuscripts = async (req, res) => {
  try {
    const manuscripts = await Manuscript.find();
    res.status(200).json(manuscripts);
  } catch (error) {
    console.error("Error fetching manuscripts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET manuscript by ID
exports.getManuscriptById = async (req, res) => {
  try {
    const manuscript = await Manuscript.findById(req.params.id);

    if (!manuscript) {
      return res.status(404).json({ message: "Manuscript not found" });
    }

    res.status(200).json(manuscript);
  } catch (error) {
    console.error("Error fetching manuscript:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE manuscript
exports.deleteManuscript = async (req, res) => {
  try {
    const deleted = await Manuscript.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Manuscript not found" });
    }

    res.status(200).json({ message: "Manuscript deleted successfully" });
  } catch (error) {
    console.error("Error deleting manuscript:", error);
    res.status(500).json({ message: "Server error" });
  }
};
