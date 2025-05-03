'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Notification.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false }, 
      message: { type: DataTypes.STRING, allowNull: false },
      link: { type: DataTypes.STRING },
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: 'Notification' }
  );

  return Notification;
};