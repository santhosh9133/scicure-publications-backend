const express = require("express");
const router = express.Router();
const menuscriptController = require("../controllers/menuscriptController");
const upload = require("../middleware/uploadMiddleware");

// Single file upload → manuscriptFile
const uploadFile = upload.single("manuscriptFile");

// Routes
router.post("/", uploadFile, menuscriptController.createManuscript);
router.get("/", menuscriptController.getAllManuscripts);
router.get("/:id", menuscriptController.getManuscriptById);
router.delete("/:id", menuscriptController.deleteManuscript);

module.exports = router;
