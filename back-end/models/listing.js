const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user"); // Assuming you have a user model

const Listing = sequelize.define("Listing", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Store images as an array
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING, // The selected cover image
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

Listing.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Listing;
