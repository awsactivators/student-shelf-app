const express = require("express");
const { createListing, getListings } = require("../controllers/listingsController");
const { listingUpload } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to mark this as a listing upload before processing
const setListingUpload = (req, res, next) => {
  req.listingUpload = true; // Mark request as a listing upload
  next();
};

// Create new listing (with image upload)
router.post("/", protect, setListingUpload, listingUpload.array("images", 3), createListing);


// Get all listings
router.get("/", getListings);

module.exports = router;
