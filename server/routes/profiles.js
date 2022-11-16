const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const { getProfile, decisionToggler } = require("../controllers/profiles");

// Profile
router.get("/:username", verifyToken, getProfile);

// Accept Offer
router.post("/:username", verifyToken, decisionToggler);

// Decline Offer
router.delete("/:username", verifyToken, decisionToggler);

module.exports = router;
