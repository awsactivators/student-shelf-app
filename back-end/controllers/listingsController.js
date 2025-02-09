const asyncHandler = require("express-async-handler");
// const db = require("../models"); 
// const Listing = db.Listing;
const { Listing } = require("../models");


// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
const createListing = asyncHandler(async (req, res) => {
  const { title, description, category, subcategory, price } = req.body;
  const userId = req.user.id;

  if (!title || !description || !category || !price) {
    res.status(400);
    throw new Error("All required fields must be filled");
  }

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("At least one image is required!");
  }

  // Get uploaded file paths
  let imagePaths = req.files.map((file) => `/uploads/listings/${file.filename}`);

  // Check if the selected cover image exists in the uploaded files
  const coverImage = req.body.coverImage || (imagePaths.length > 0 ? imagePaths[0] : null);

  // Create new listing
  const listing = await Listing.create({
    title,
    description,
    category,
    subcategory,
    price,
    images: JSON.stringify(imagePaths), // Store all image paths
    coverImage, // Store selected cover image
    userId,
  });

  res.status(201).json({
    message: "Listing created successfully",
    listing: listing,
  });
});



// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    res.status(500).json({ message: "Server error fetching listings" });
  }
});

module.exports = { createListing, getListings };
