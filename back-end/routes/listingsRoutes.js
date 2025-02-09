const express = require("express");
const { createListing, getListings } = require("../controllers/listingsController");
const { listingUpload, setListingUpload } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create new listing (with image upload)
router.post("/", protect, setListingUpload, listingUpload.array("images", 3), createListing);

// Get all listings
router.get("/", getListings);

module.exports = router;
