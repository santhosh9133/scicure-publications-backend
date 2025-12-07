const express = require("express");
const router = express.Router();
const menuscriptController = require("../controllers/menuscriptController");
const { verifyAdminToken } = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddleware");

// Single file upload → manuscriptFile
const uploadFile = upload.single("manuscriptFile");

// Routes
router.post("/", uploadFile, menuscriptController.createManuscript);
router.get("/", verifyAdminToken, menuscriptController.getAllManuscripts);
router.get("/:id", verifyAdminToken, menuscriptController.getManuscriptById);
router.delete("/:id", verifyAdminToken, menuscriptController.deleteManuscript);

module.exports = router;
