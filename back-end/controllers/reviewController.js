const asyncHandler = require("express-async-handler");
const { Review, User } = require("../models");

// @desc    Add a review
// @route   POST /api/reviews/:sellerId
// @access  Private
const addReview = asyncHandler(async (req, res) => {
  const { sellerId } = req.params; // Get sellerId from URL params
  const { rating, comment } = req.body;

  console.log("Received sellerId:", sellerId); 

  if (!rating || !comment) {
    res.status(400);
    throw new Error("Rating and comment are required.");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated.");
  }

  const buyerId = req.user.id;

  // Check if seller exists
  const seller = await User.findByPk(sellerId);
  if (!seller) {
    console.log("Seller not found for ID:", sellerId); 
    res.status(404);
    throw new Error("Seller not found.");
  }

  // Create review
  const review = await Review.create({
    sellerId,
    buyerId,
    rating,
    comment,
  });

  // Calculate new seller rating (average)
  const sellerReviews = await Review.findAll({ where: { sellerId } });
  const averageRating =
    sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length;

  seller.rating = averageRating.toFixed(1); 
  await seller.save();

  res.status(201).json({
    id: review.id,
    sellerId: review.sellerId,
    buyerId: review.buyerId,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
    reviewerName: req.user.name,
  });
});

module.exports = { addReview };
