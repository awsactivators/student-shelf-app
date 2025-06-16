const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Listing, User } = require("../models");

// @desc    Search Listings
// @route   GET /api/search?query=some-text
// @access  Private (Requires Auth)
const searchListings = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    const listings = await Listing.findAll({
        where: {
            title: { [Op.ilike]: `%${query}%` }, // Partial match search
        },
        attributes: ["id", "title", "coverImage", "price"],
    });

    res.json(listings);
});

module.exports = { searchListings };
