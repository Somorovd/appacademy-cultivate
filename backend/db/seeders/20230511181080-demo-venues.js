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
        city: "Salem",
        state: "MA",
        lat: "42.519539",
        lng: "-70.896713"
      },
      {
        groupId: 2,
        address: "The Old Pine Forest",
        city: "Boulder",
        state: "CO",
        lat: "40.0150",
        lng: "105.2705"
      },
      {
        groupId: 3,
        address: "The Farm",
        city: "Hollywood",
        state: "CA",
        lat: "34.0928",
        lng: "118.3287"
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
