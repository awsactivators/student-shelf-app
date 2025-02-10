const asyncHandler = require("express-async-handler");
// const db = require("../models"); 
// const Listing = db.Listing;
const { Listing } = require("../models");


// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
const createListing = asyncHandler(async (req, res) => {
  console.log("Received fields:", req.body);
  console.log("Received files:", req.files);

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
  const imagePaths = req.files.map((file) => `/uploads/listings/${file.filename}`);
  console.log("Image paths:", imagePaths);

  // Set the first image as the cover image if none is specified
  const coverImage = imagePaths.length > 0 ? imagePaths[0] : null;

  // Create new listing
  try {
    const listing = await Listing.create({
      title,
      description,
      category,
      subcategory,
      price,
      images: JSON.stringify(imagePaths), // Store all images
      coverImage, // Store the selected cover image
      userId,
    });

    console.log("Listing created:", listing);
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
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


// @desc    Get a single listing by ID
// @route   GET /api/listings/:id
// @access  Private
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  // Parse the JSON images field into an array before sending
  const parsedListing = {
    ...listing.toJSON(),
    images: JSON.parse(listing.images), // Ensure `images` is an array
  };
  console.log(parsedListing);

  res.json(parsedListing);
});


const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { existingImages, ...otherData } = req.body;

  const listing = await Listing.findByPk(id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (listing.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this listing");
  }

  // Merge existing and new images
  const updatedImages = [
    ...(existingImages ? JSON.parse(existingImages) : []),
    ...(req.files ? req.files.map((file) => `/uploads/listings/${file.filename}`) : []),
  ];

  // Update the listing
  await listing.update({
    ...otherData,
    images: JSON.stringify(updatedImages),
    coverImage: otherData.coverImage || listing.coverImage,
  });

  res.status(200).json(listing);
});




// @desc    DELETE listings
// @route   DELETE /api/listings/:id
// @access  Public
const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByPk(id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (listing.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this listing");
  }

  await listing.destroy();
  res.status(200).json({ message: "Listing deleted successfully" });
});


module.exports = { createListing, getListings, deleteListing, getListingById, updateListing };
