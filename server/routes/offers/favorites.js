const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authentication");
const { favoriteToggler } = require("../../controllers/favorites");

// Favorite Offer
router.post("/:slug/favorite", verifyToken, favoriteToggler);
// Unfavorite Offer
router.delete("/:slug/favorite", verifyToken, favoriteToggler);

module.exports = router;
