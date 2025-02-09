"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Listings", "images", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("Listings", "coverImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Listings", "images");
    await queryInterface.removeColumn("Listings", "coverImage");
    await queryInterface.removeColumn("Listings", "image");
  },
};
