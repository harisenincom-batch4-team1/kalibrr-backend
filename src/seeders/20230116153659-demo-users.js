'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        id: i,
        fullname: `employe${i}`,
        username:  `analis`,
        email: `0876787667898`,
        password: 'alamat employe',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {
      truncate: true
    });
  }
};
