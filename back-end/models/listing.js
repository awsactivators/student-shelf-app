'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      Listing.belongsTo(models.User, { foreignKey: 'userId', as: "user", onDelete: 'CASCADE' });
    }
  }

  Listing.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      subcategory: { type: DataTypes.STRING },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      images: { type: DataTypes.JSON, allowNull: false },
      coverImage: { type: DataTypes.STRING },
      userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: "CASCADE"
      },
    },
    {
      sequelize,
      modelName: 'Listing',
    }
  );

  return Listing;
};



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Listing extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Listing.init({
//     title: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     category: DataTypes.STRING,
//     subcategory: DataTypes.STRING,
//     price: DataTypes.DECIMAL,
//     images: DataTypes.JSON,
//     coverImage: DataTypes.STRING,
//     userId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Listing',
//   });
//   return Listing;
// };