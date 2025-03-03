const asyncHandler = require("express-async-handler");
const { Listing, User } = require("../models");


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

  if (!req.files || !req.files["images"] || req.files["images"].length === 0) {
    res.status(400);
    throw new Error("At least one image is required!");
  }

  // Extract uploaded image paths
  let imagePaths = req.files["images"].map((file) => `/uploads/listings/${file.filename}`);

  // Check for cover image separately
  const coverImagePath = req.files["coverImage"] ? `/uploads/listings/${req.files["coverImage"][0].filename}` : imagePaths[0];

  // Save listing to database
  const listing = await Listing.create({
    title,
    description,
    category,
    subcategory,
    price,
    images: JSON.stringify(imagePaths),
    coverImage: coverImagePath,
    userId,
  });

  res.status(201).json({
    message: "Listing created successfully",
    listing,
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


// @desc    Get a single listing by ID
// @route   GET /api/listings/:id
// @access  Private
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findByPk(req.params.id, {
    include: {
      model: User,
      as: "user", 
      attributes: ["id", "name", "campus", "rating", "activeListings", "profileImage", "createdAt"], 
    },
  });

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (!listing.user) {
    res.status(400);
    throw new Error("Listing is not associated with User!");
  }
  
  console.log("Full Listing Data:", listing);
  console.log("User Data:", listing.User); 

  // Parse the JSON images field into an array before sending
  const parsedListing = {
    ...listing.toJSON(),
    images: JSON.parse(listing.images), // Ensure `images` is an array
  };

  console.log("Updated Listing Response:", parsedListing);

  res.json(parsedListing);
});



// @desc    Update a single listing by ID
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { existingImages, coverImage, ...otherData } = req.body;

  const listing = await Listing.findByPk(id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (listing.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this listing");
  }

  let updatedImages = [];

  // Preserve old images
  if (existingImages) {
    updatedImages = JSON.parse(existingImages);
  }

  // Add new images if uploaded
  if (req.files && req.files.images) {
    updatedImages = [
      ...updatedImages,
      ...req.files.images.map((file) => `/uploads/listings/${file.filename}`),
    ];
  }

  // Update cover image: Prioritize new upload, fallback to existing selection
  let updatedCoverImage = listing.coverImage; // Default to old cover image
  
  if (req.files && req.files.coverImage) {
    updatedCoverImage = `/uploads/listings/${req.files.coverImage[0].filename}`;
  } else if (coverImage && typeof coverImage === "string") {
    updatedCoverImage = coverImage;
  }

  // Update listing data
  await listing.update({
    ...otherData,
    images: JSON.stringify(updatedImages),
    coverImage: updatedCoverImage,
  });

  res.status(200).json({
    message: "Listing updated successfully",
    listing: {
      ...listing.toJSON(),
      images: updatedImages,
      coverImage: updatedCoverImage,
    },
  });
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
