const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authentication");
const {
  allComments,
  createComment,
  deleteComment,
} = require("../../controllers/comments");

// All Comments for Offer
router.get("/:slug/comments", verifyToken, allComments);
// Create Comment for Offer
router.post("/:slug/comments", verifyToken, createComment);
// Delete Comment for Offer
router.delete("/:slug/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
