const express = require("express");
const { searchListings } = require("../controllers/searchController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, searchListings);

module.exports = router;
