const express = require("express");
const { createListing, getListings, getListingById, deleteListing, updateListing, searchListings, getAllPublicListings } = require("../controllers/listingsController");
const { listingUpload } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all listings (public)
router.get("/all", getAllPublicListings);

// Middleware to mark this as a listing upload before processing
const setListingUpload = (req, res, next) => {
  req.listingUpload = true; // Mark request as a listing upload
  next();
};


// Update a listing
router.put("/:id", protect, listingUpload.fields([
  { name: "images", maxCount: 3 }, 
  { name: "coverImage", maxCount: 1 }
]), updateListing);

// Create new listing
router.post("/", protect, setListingUpload, listingUpload.fields([
  { name: "images", maxCount: 3 }, 
  { name: "coverImage", maxCount: 1 }
]), createListing);



// Get all listings
router.get("/", protect, getListings);

// Get a single listing by ID
router.get("/:id", protect, getListingById);

// Delete a listing
router.delete("/:id", protect, deleteListing);

// Update a listing
router.put("/:id", protect, listingUpload.fields([
  { name: "images", maxCount: 3 }, 
  { name: "coverImage", maxCount: 1 }
]), updateListing);

// Search 
router.get("/search", searchListings);


module.exports = router;
