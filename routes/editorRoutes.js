const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorController");
const upload = require("../middleware/uploadMiddleware"); // Multer
const { verifyAdminToken } = require("../middleware/verifyToken");

// Single file upload for profileImage
const uploadProfile = upload.single("profileImage");

// Routes
router.post(
  "/",
  verifyAdminToken,
  uploadProfile,
  editorController.createEditor
);
router.get("/", verifyAdminToken, editorController.getAllEditors);
router.get("/:id", verifyAdminToken, editorController.getEditorById);
router.put(
  "/:id",
  verifyAdminToken,
  uploadProfile,
  editorController.updateEditor
);
router.delete("/:id", verifyAdminToken, editorController.deleteEditor);

module.exports = router;
