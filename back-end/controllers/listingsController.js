const asyncHandler = require("express-async-handler");
const { Listing, User, ActivityLog } = require("../models");
const { Op } = require("sequelize");


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

  try {
    await ActivityLog.create({
      userId: req.user.id,
      action: "Add Listing",
      description: `User ${req.user.name} added a new listing titled "${title}"`
    });
  } catch (err) {
    console.error("Error logging activity:", err);
  }

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
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const userId = req.user.id; // Get the logged-in user's ID

    const listings = await Listing.findAll({
      where: { userId }, // Only fetch listings for this user
      order: [["createdAt", "DESC"]],
    });

    res.json(listings.length ? listings : []); // Always return an array
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
    images: JSON.parse(listing.images), // Ensures images is an array
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

  await ActivityLog.create({
    userId: req.user.id,
    action: "Update Listing",
    description: `User ${req.user.name} updated listing: ${listing.title}`,
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

  await ActivityLog.create({
    userId: req.user.id,
    action: "Delete Listing",
    description: `User ${req.user.name} deleted listing: ${listing.title}`,
  });

  await listing.destroy();
  res.status(200).json({ message: "Listing deleted successfully" });
});



// @desc    Search Listings
// @route   GET /api/listings/search?query=
// @access  Public
const searchListings = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
      return res.status(400).json({ message: "Search query is required" });
  }

  const listings = await Listing.findAll({
      where: {
          title: { [Op.like]: `%${query}%` }
      },
      attributes: ["id", "title", "coverImage", "price"],
  });

  res.json(listings);
});



// @desc Get all listings
// @route GET /api/listings
// @access Public
// Add to listingsController.js
const getAllPublicListings = asyncHandler(async (req, res) => {
  const listings = await Listing.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "campus", "profileImage"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json(listings);
});


// Search listings by title
const searchPublicListings = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const listings = await Listing.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "campus"],
        },
      ],
      attributes: ["id", "title", "coverImage", "price"],
      order: [["createdAt", "DESC"]],
    });

    res.json(listings);
  } catch (error) {
    console.error("Error searching listings:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});




module.exports = { 
  createListing, 
  getListings, 
  deleteListing, 
  getListingById, 
  updateListing, 
  searchListings, 
  getAllPublicListings,
  searchPublicListings };
