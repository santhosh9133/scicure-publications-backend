const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorController");
const upload = require("../middleware/uploadMiddleware"); // Multer

// Single file upload for profileImage
const uploadProfile = upload.single("profileImage");

// Routes
router.post("/", uploadProfile, editorController.createEditor);
router.get("/", editorController.getAllEditors);
router.get("/:id", editorController.getEditorById);
router.put("/:id", uploadProfile, editorController.updateEditor);
router.delete("/:id", editorController.deleteEditor);

module.exports = router;
