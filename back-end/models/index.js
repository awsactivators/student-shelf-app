const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config.json"); // DB Config
const UserModel = require("./user"); // Import User model

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

module.exports = db;
