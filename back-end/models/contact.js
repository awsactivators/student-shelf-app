'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Contact.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.TEXT,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending"
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      }
    },
    {
      sequelize,
      modelName: 'Contact',
    }
  );
  return Contact;
};