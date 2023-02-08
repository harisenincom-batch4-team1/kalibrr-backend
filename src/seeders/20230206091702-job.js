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
    const Jobs = [];
    for (let i = 0; i < 30; i++) {
      Jobs.push({
        companyId: 1,
        name: "Jr Frontend Engineer",
        type: "remote",
        tenure: "Full Time",
        status: "open",
        salaryMin: 7000000,
        salaryMax: 800000,
        jobDescription:
          "<p>1. Design, develop and build highly scalable, cross-platform, and high-performance web/mobile applications using React and React-Native.</p> <p>2. Apply design patterns and design principles tomaintainable and easy to extend code.</p> <p>3. Perform issue analysis, root-cause analysis, and issue resolution.</p> <p>4. Write and manage technical documentation.</p>",
        jobQualification:
          "<p>1. Strong proficiency in Typescript</p> <p>2. Experience in responsive web and PWA</p> <p>3. Extensive knowledge in using RESTful and GraphQL</p> <p>4. Experience working with Redux, Redux-Saga, Redux-Thunk, or MobX</p> <p>5. Have experience/exposure to cloud services (AWS/GCP)</p>",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Jobs", Jobs, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
