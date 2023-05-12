'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Groups";
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: "Foodies",
        about: "We find food related events",
        type: "in person",
        private: false,
        city: "Boston",
        state: "MA"
      },
      {
        organizerId: 2,
        name: "Fun for the Kidz",
        about: "Family friendly actvities, indoors and outdoors",
        type: "in person",
        private: false,
        city: "Boston",
        state: "MA"
      },
      {
        organizerId: 3,
        name: "Rick's Bowling Club",
        about: "Rick's Bowling Club based in Honolulu",
        type: "in person",
        private: true,
        city: "Honolulu",
        state: "HI"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Groups";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: ["Foodies", "Fun for the Kidz", "Rick's Bowling Club"]
    });
  }
};
