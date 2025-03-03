const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config.json"); // DB Config
const UserModel = require("./user"); // Import User model
const ListingModel = require("./listing"); // Import Listing model
const ReviewModel = require("./review"); // Import Listing model

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  dbConfig.development
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = UserModel(sequelize, Sequelize);
db.Listing = ListingModel(sequelize, Sequelize); 
db.Review = ReviewModel(sequelize, Sequelize)

// Associations
db.User.hasMany(db.Listing, { foreignKey: "userId", as: "userListings", onDelete: "CASCADE" });
db.Listing.belongsTo(db.User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });

db.User.hasMany(db.Review, { foreignKey: "sellerId", as: "reviews" });
db.Review.belongsTo(db.User, { foreignKey: "sellerId", as: "seller" });

db.User.hasMany(db.Review, { foreignKey: "buyerId", as: "buyerReviews" });
db.Review.belongsTo(db.User, { foreignKey: "buyerId", as: "buyer" });


module.exports = db;
