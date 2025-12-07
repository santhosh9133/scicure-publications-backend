const Article = require("../models/articlesModel");
const User = require("../models/userModel");

// ===============================
// CREATE ARTICLE
// ===============================

exports.createArticle = async (req, res) => {
  try {
    const manuscriptFile = req.files?.manuscriptFile?.[0]?.filename || "";
    const coverImage = req.files?.coverImage?.[0]?.filename || "";

    if (!manuscriptFile) {
      return res.status(400).json({ message: "Manuscript file is required" });
    }

    // Get journal (stored in user model)
    const journal = await User.findById(req.body.journalId);
    if (!journal) {
      return res.status(404).json({ message: "Journal (User) not found" });
    }

    const newArticle = new Article({
      articleTitle: req.body.articleTitle,
      journalId: req.body.journalId, // this is User ID
      authorName: req.body.authorName,
      authorEmail: req.body.authorEmail,
      articleType: req.body.articleType,
      abstract: req.body.abstract,
      keywords: req.body.keywords,
      doiNumber: req.body.doiNumber,
      submissionDate: req.body.submissionDate,
      acceptanceDate: req.body.acceptanceDate,
      publicationDate: req.body.publicationDate,
      volumeNumber: req.body.volumeNumber,
      issueNumber: req.body.issueNumber,
      manuscriptFile,
      coverImage,
      articleStatus: req.body.articleStatus,
      publisherName: req.body.publisherName,
    });

    await newArticle.save();

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error });
  }
};

// ===============================
// GET ALL ARTICLES
// ===============================
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate(
      "journalId",
      "journalId journalName" // whatever fields your User model has
    );

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

// ===============================
// GET ARTICLE BY ID
// ===============================
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "journalId",
      "journalId journalName" // use fields from User model
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

// ===============================
// UPDATE ARTICLE
// ===============================
exports.updateArticle = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files?.manuscriptFile) {
      updateData.manuscriptFile = req.files.manuscriptFile[0].filename;
    }

    if (req.files?.coverImage) {
      updateData.coverImage = req.files.coverImage[0].filename;
    }

    // If journal updated, update shortname also
    if (req.body.journalName) {
      const journal = await Journal.findById(req.body.journalName);
      if (journal) {
        updateData.journalShortname = journal.journalShortname;
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error });
  }
};

// ===============================
// DELETE ARTICLE
// ===============================
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error });
  }
};
