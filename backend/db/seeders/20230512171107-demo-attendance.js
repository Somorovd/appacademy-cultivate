'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Attendances";
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        status: "attending",
      },

      {
        eventId: 1,
        userId: 5,
        status: "attending",
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Attendances";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: [1, 2, 3, 4]
    });
  }
};
