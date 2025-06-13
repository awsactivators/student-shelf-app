'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@student_shelf', 10);

    await queryInterface.bulkInsert('Users', [{
      name: 'Admin User',
      email: 'n01234567@humber.ca',
      campus: 'North',
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: 'n01234567@humber.ca'
    });
  }
};