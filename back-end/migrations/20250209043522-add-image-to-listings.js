"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Listings", "image", {
      type: Sequelize.STRING,
      allowNull: true, // Users may or may not upload an image
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Listings", "image");
  },
};
