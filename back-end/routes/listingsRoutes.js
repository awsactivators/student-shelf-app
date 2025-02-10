const express = require("express");
const { createListing, getListings, getListingById, deleteListing, updateListing } = require("../controllers/listingsController");
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

// Get a single listing by ID
router.get("/:id", protect, getListingById);

// Delete a listing
router.delete("/:id", protect, deleteListing);

// Update a listing
router.put("/:id", protect, listingUpload.array("images", 3), updateListing);


module.exports = router;
