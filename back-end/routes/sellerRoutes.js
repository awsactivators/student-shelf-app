const express = require("express");
const { getSellerById } = require("../controllers/sellerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get seller details by ID
router.get("/:id", protect, getSellerById);

module.exports = router;
