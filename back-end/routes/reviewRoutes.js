const express = require("express");
const { addReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Correct POST Route: Add a review
router.post("/:sellerId", protect, addReview);

module.exports = router;
