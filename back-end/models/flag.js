'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flag extends Model {
    static associate(models) {
      Flag.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Flag.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  Flag.init(
    {
      reason: { type: DataTypes.STRING, allowNull: false },
      comment: { type: DataTypes.TEXT },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      listingId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'Flag' }
  );
  return Flag;
};