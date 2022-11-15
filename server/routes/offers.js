const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const {
  allOffers,
  createOffer,
  singleOffer,
  updateOffer,
  acceptOffer,
  rejectOffer,
  deleteOffer,
  offersFeed,
} = require("../controllers/offers");

// All Offers - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allOffers);

// Create Offer
router.post("/", verifyToken, createOffer);

// Feed
router.get("/feed", verifyToken, offersFeed);

// Single Offer by slug
router.get("/:slug", verifyToken, singleOffer);

// Update Offer
router.put("/:slug", verifyToken, updateOffer);

// Accept Offer 
router.put("/:slug/accept", verifyToken, acceptOffer);

// Reject Offer 
router.put("/:slug/reject", verifyToken, rejectOffer);

// Delete Offer
router.delete("/:slug", verifyToken, deleteOffer);

const favoritesRoutes = require("./offers/favorites");
const commentsRoutes = require("./offers/comments");

// Favorites routes
router.use("/", favoritesRoutes);
// Questions routes
router.use("/", commentsRoutes);

module.exports = router;
