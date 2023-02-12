"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JobApplications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Jobs", key: "id" },
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          "onreview",
          "selected",
          "interview",
          "test",
          "offering",
          "recruited",
          "rejected",
        ],
        defaultValue: "onreview",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("JobApplications");
  },
};
