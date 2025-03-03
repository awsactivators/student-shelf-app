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
  const API_URL = process.env.API_URL || "http://localhost:5500"; // Ensure BASE URL is correct
  const fullProfileImage = seller.profileImage
    ? seller.profileImage.startsWith("http") // Check if already full URL
      ? seller.profileImage
      : `${API_URL}${seller.profileImage}`
    : "../assets/default-logo.jpg"; // Default if no profile image

  res.json({
    ...seller.toJSON(),
    profileImage: fullProfileImage,  // Ensure correct image path
  });
});

module.exports = { getSellerById };
