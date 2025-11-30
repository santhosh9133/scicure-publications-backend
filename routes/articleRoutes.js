const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const upload = require("../middleware/uploadMiddleware"); // multer instance

// Declare fields using a new variable name
const uploadFields = upload.fields([
  { name: "manuscriptFile", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

// Routes
router.post("/", uploadFields, articleController.createArticle);
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.put("/:id", uploadFields, articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
