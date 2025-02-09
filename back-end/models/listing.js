// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const Listing = sequelize.define(
//     "Listing",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       category: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       subcategory: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       image: {
//         type: DataTypes.STRING, // Store file path
//         allowNull: true,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Users", // Reference User model
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//     },
//     {
//       timestamps: true, // Adds createdAt and updatedAt
//     }
//   );

//   Listing.associate = function (models) {
//     Listing.belongsTo(models.User, { foreignKey: "userId", as: "user" });
//   };

//   return Listing;
// };


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
