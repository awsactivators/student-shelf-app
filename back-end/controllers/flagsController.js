const asyncHandler = require("express-async-handler");
const { Flag } = require("../models");

const createFlag = asyncHandler(async (req, res) => {
  const { reason, comment, listingId } = req.body;
  const userId = req.user.id;

  if (!reason || !listingId) {
    res.status(400);
    throw new Error("Reason and listingId are required");
  }

  const existingFlag = await Flag.findOne({
    where: { userId, listingId },
  });

  if (existingFlag) {
    res.status(400);
    throw new Error("You’ve already flagged this listing.");
  }

  const flag = await Flag.create({ reason, comment, userId, listingId });

  res.status(201).json({ message: "Flag submitted successfully", flag });
});

module.exports = { createFlag };