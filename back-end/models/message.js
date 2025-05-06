"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Define associations here
      // A message belongs to a sender and a receiver
      // The sender and receiver are both users
      Message.belongsTo(models.User, { foreignKey: "senderId", as: "sender" });
      Message.belongsTo(models.User, { foreignKey: "receiverId", as: "receiver" });
    }
  }

  Message.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      messageText: {
        type: DataTypes.TEXT,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "Messages", 
    }
  );

  return Message;
};