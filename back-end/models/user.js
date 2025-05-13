'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Listing, { foreignKey: "userId", as: "userListings" });
      User.hasMany(models.Review, { foreignKey: "sellerId", as: "reviews" });
      User.hasMany(models.Review, { foreignKey: "buyerId", as: "buyerReviews" });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    campus: DataTypes.STRING,
    bio: DataTypes.TEXT,
    policy: DataTypes.TEXT,
    phoneNumber: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    activeListings: DataTypes.INTEGER,
    // isVerified: DataTypes.BOOLEAN,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};