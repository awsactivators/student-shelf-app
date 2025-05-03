const asyncHandler = require("express-async-handler");
const { User, Listing, Review } = require("../models");

// @desc    Get seller details
// @route   GET /api/sellers/:id
// @access  Public
const getSellerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const seller = await User.findByPk(id, {
    attributes: ["id", "name", "campus", "rating", "bio", "policy", "createdAt", "profileImage", "isVerified"],
    include: [
      {
        model: Listing,
        as: "userListings",
        attributes: ["id", "title", "coverImage", "price"],
      },
      {
        model: Review,
        as: "reviews", 
        attributes: ["id", "rating", "comment", "createdAt"],
        include: [
          { model: User, as: "buyer", attributes: ["name"] },
        ],
      },
    ],
  });

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }


  // Fix profileImage URL
  const API_URL = process.env.API_URL || "http://localhost:5500";
  const fullProfileImage = seller.profileImage
    ? seller.profileImage.startsWith("http") 
      ? seller.profileImage
      : `${API_URL}${seller.profileImage}`
    : "../assets/default-logo.jpg"; 

  res.json({
    ...seller.toJSON(),
    profileImage: fullProfileImage,  // Ensure correct image path
  });
});


// @desc    Get all listings for a specific seller
// @route   GET /api/sellers/:sellerId/listings
// @access  Public
const getSellerListings = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;

  // Check if seller exists
  const seller = await User.findByPk(sellerId, {
    include: {
      model: Listing,
      as: "userListings",
      attributes: ["id", "title", "coverImage", "price"],
    },
  });

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  // Fetch listings for the seller
  const listings = await Listing.findAll({
    where: { userId: sellerId },
    attributes: ["id", "title", "coverImage", "price", "category"],
    order: [["createdAt", "DESC"]],
  });

  res.json(listings);
});


// @desc    Get a specific listing for a seller
// @route   GET /api/sellers/:sellerId/listings/:listingId
// @access  Public
const getSellerListingById = asyncHandler(async (req, res) => {
  const { sellerId, listingId } = req.params;

  // Find the listing that belongs to the seller
  const listing = await Listing.findOne({
    where: { id: listingId, userId: sellerId },
    include: [
      {
        model: User,
        as: "user", 
        attributes: ["id", "name", "campus", "rating", "profileImage", "createdAt"],
      },
    ],
  });

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found or does not belong to the seller");
  }

  // Parse images if stored as a JSON string
  const parsedListing = {
    ...listing.toJSON(),
    images: Array.isArray(listing.images) ? listing.images : JSON.parse(listing.images || "[]"),
  };

  res.json(parsedListing);
});


module.exports = { getSellerById, getSellerListings, getSellerListingById };
