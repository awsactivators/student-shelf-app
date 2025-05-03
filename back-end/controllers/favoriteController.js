const { Favorite, User, Notification } = require("../models");

const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { sellerId } = req.params;

  const exists = await Favorite.findOne({ where: {userId, favoriteUserId: sellerId } });
  if (exists) return res.status(400).json({ message: "Already favorited" });

  await Favorite.create({ userId, favoriteUserId: sellerId });

  // Create notification for the seller
  await Notification.create({
    userId: sellerId,
    message: `${req.user.name} favorited your profile.`,
    type: 'favorite',
    isRead: false,
    link: `/seller/${sellerId}`,
  });

  res.json({ message: "Seller added to favorites" });
};

const removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const { sellerId } = req.params;

  await Favorite.destroy({ where: { userId, favoriteUserId: sellerId } });
  res.json({ message: "Seller removed from favorites" });
};

const getFavorites = async (req, res) => {
  const userId = req.user.id;
  const favorites = await Favorite.findAll({
    where: { userId },
    include: [{ model: User, as: "favoriteUser", attributes: ["id", "name", "profileImage"] }],
  });

  const favoriteUsers = favorites
  .filter(fav => fav.favoriteUser !== null) 
  .map(fav => fav.favoriteUser);
  res.json(favoriteUsers);
};

module.exports = { addFavorite, removeFavorite, getFavorites };