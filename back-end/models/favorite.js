'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Favorite.belongsTo(models.User, { foreignKey: "favoriteUserId", as: "favoriteUser" });
    }
  }

  Favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      favoriteUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );

  return Favorite;
};