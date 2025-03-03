const express = require("express");
const { getSellerById, getSellerListings } = require("../controllers/sellerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get seller details by ID
router.get("/:id", protect, getSellerById);

router.get("/:sellerId/listings", getSellerListings);


module.exports = router;
