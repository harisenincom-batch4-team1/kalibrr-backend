"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const Users = [];
    for (let i = 0; i < 50; i++) {
      Users.push({
        // id: i,
        name: `user${i}`,
        email: `user${i}@mail.com`,
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Users", Users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {
      // truncate: true,
    });
  },
};
