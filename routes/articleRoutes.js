const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const upload = require("../middleware/uploadMiddleware"); // multer instance
const { verifyAdminToken } = require("../middleware/verifyToken");

// Declare fields using a new variable name
const uploadFields = upload.fields([
  { name: "manuscriptFile", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

// Routes
router.post(
  "/",
  verifyAdminToken,
  uploadFields,
  articleController.createArticle
);
router.get("/", verifyAdminToken, articleController.getAllArticles);
router.get("/:id", verifyAdminToken, articleController.getArticleById);
router.get("/issue/:issueId", articleController.getArticlesByIssue);
router.put(
  "/:id",
  verifyAdminToken,
  uploadFields,
  articleController.updateArticle
);
router.delete("/:id", verifyAdminToken, articleController.deleteArticle);

module.exports = router;
