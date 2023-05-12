'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Venues";
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: "1000 Farm Road",
        city: "Boston",
        state: "MA",
        lat: "42.3601",
        lng: "71.0589"
      },
      {
        groupId: 2,
        address: "1000 Farm Road",
        city: "Boston",
        state: "MA",
        lat: "42.3601",
        lng: "71.0589"
      },
      {
        groupId: 1,
        address: "Super HipHop Bar",
        city: "Boston",
        state: "MA",
        lat: "41.4645",
        lng: "72.7654"
      },
      {
        groupId: 3,
        address: "Rick's Bowling Club",
        city: "Honolulu",
        state: "HI",
        lat: "21.7756",
        lng: "157.1015"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Venues";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: [1, 2, 3]
    });
  }
};
