const express = require("express");
const { createListing, getListings, getListingById, deleteListing, updateListing, searchListings, getAllPublicListings, searchPublicListings } = require("../controllers/listingsController");
const { uploader } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all listings (public)
router.get("/all", getAllPublicListings);

// Search listings (public)
router.get("/search", searchPublicListings);

// Middleware to mark this as a listing upload before processing
const setListingUpload = (req, res, next) => {
  req.listingUpload = true; 
  next();
};


// // Update a listing
// router.put("/:id", protect, listingUpload.fields([
//   { name: "images", maxCount: 3 }, 
//   { name: "coverImage", maxCount: 1 }
// ]), updateListing);

// // Create new listing
// router.post("/", protect, setListingUpload, listingUpload.fields([
//   { name: "images", maxCount: 3 }, 
//   { name: "coverImage", maxCount: 1 }
// ]), createListing);

// Create new listing
router.post(
  "/",
  protect,
  setListingUpload,
  uploader.fields([
    { name: "images", maxCount: 3 },
    { name: "coverImage", maxCount: 1 }
  ]),
  createListing
);

// Update a listing
router.put(
  "/:id",
  protect,
  setListingUpload,
  uploader.fields([
    { name: "images", maxCount: 3 },
    { name: "coverImage", maxCount: 1 }
  ]),
  updateListing
);



// Get all listings
router.get("/", protect, getListings);

// Get a single listing by ID
router.get("/:id", protect, getListingById);

// Delete a listing
router.delete("/:id", protect, deleteListing);

// Search 
router.get("/search", searchListings);


module.exports = router;
