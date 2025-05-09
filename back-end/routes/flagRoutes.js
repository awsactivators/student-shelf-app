const express = require("express");
const { createFlag } = require("../controllers/flagsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, createFlag);

module.exports = router;