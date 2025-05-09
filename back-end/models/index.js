const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config.json"); 
const UserModel = require("./user"); 
const ListingModel = require("./listing"); 
const ReviewModel = require("./review"); 
const FavoriteModel = require("./favorite");
const NotificationModel = require("./notification");
const MessageModel = require("./message");
const FlagModel = require("./flag");

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
db.Favorite = FavoriteModel(sequelize, Sequelize);
db.Notification = NotificationModel(sequelize, Sequelize);
db.Message = MessageModel(sequelize, Sequelize); 
db.Flag = FlagModel(sequelize, Sequelize);

// Call Associations
db.Favorite.associate(db);
db.Notification.associate(db);
db.Review.associate(db);
db.User.associate(db);
db.Message.associate(db);
db.Flag.associate(db);

// Associations
db.User.hasMany(db.Listing, { foreignKey: "userId", as: "userListings", onDelete: "CASCADE" });
db.Listing.belongsTo(db.User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });


module.exports = db;
