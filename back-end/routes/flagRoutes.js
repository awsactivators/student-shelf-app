const express = require("express");
const { createFlag } = require("../controllers/flagsController");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
const { Flag } = require("../models");

const router = express.Router();
router.post("/", protect, createFlag);

router.get("/", protect, asyncHandler(async (req, res) => {
  const { listingId } = req.query;
  const where = listingId ? { listingId } : {};
  try {
    const flags = await Flag.findAll({ where });
    res.json(flags);
  } catch (err) {
    console.error("Error fetching flags:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}));

module.exports = router;