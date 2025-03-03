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

  res.json(seller);
});

module.exports = { getSellerById };
