const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config.json"); // DB Config
const UserModel = require("./user"); // Import User model
const ListingModel = require("./listing"); // Import Listing model

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

// Associations
db.Listing.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = db;
