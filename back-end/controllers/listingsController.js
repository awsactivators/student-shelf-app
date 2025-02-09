const asyncHandler = require("express-async-handler");
// const Listing = require("../models/listing");
const db = require("../models"); 
const Listing = db.Listing;

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.findAll();
  res.json(listings);
});

module.exports = { getListings };
