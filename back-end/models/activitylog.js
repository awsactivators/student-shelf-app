'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      ActivityLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  ActivityLog.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  }, {
    sequelize,
    modelName: 'ActivityLog',
  });
  return ActivityLog;
};