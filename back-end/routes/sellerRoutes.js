const express = require("express");
const { getSellerById, getSellerListings, getSellerListingById } = require("../controllers/sellerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get seller details by ID
router.get("/:id", protect, getSellerById);

router.get("/:sellerId/listings", getSellerListings);

// Seller Listings Details Route
router.get("/:sellerId/listings/:listingId", getSellerListingById);



module.exports = router;
