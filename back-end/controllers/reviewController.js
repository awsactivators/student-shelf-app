const asyncHandler = require("express-async-handler");
const { Review, User, Notification } = require("../models");

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

  try {
    await Notification.create({
      userId: sellerId,
      message: `${req.user.name} left a review on your profile.`,
      type: 'review',
      isRead: false,
      link: `/seller/${sellerId}`,
    });
    console.log("Notification created successfully.");
  } catch (error) {
    console.error("Failed to create notification:", error);
  }

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


// @desc    Get all reviews for a seller (with buyer name)
// @route   GET /api/reviews/:sellerId
// @access  Public
const getReviewsBySeller = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;

  const reviews = await Review.findAll({
    where: { sellerId },
    include: [
      {
        model: User,
        as: "buyer",
        attributes: ["name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json(reviews);
});

module.exports = { addReview, getReviewsBySeller };
