'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'rating', {
      type: Sequelize.DECIMAL(2,1),
      allowNull: true,
      defaultValue: 0
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'campus', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'rating', {
      type: Sequelize.DECIMAL(10,0),
      allowNull: true
    });

    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Users', 'campus', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
