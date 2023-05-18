'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: "Pie Eating Contest",
        description: "Eat as much pie as you can!",
        type: "In Person",
        capacity: 50,
        price: 20,
        startDate: "2025-10-01",
        endDate: "2025-10-01"
      },
      {
        venueId: 1,
        groupId: 2,
        name: "Hay Rides",
        description: "Take a tour of the farm on a nice hay-filled wagon",
        type: "In Person",
        capacity: 25,
        price: 0,
        startDate: "2025-10-01",
        endDate: "2025-10-01"
      },
      {
        venueId: 2,
        groupId: 1,
        name: "Beer Tasting",
        description: "Taste great wines at the newly opened Super HipHop Beers",
        type: "In Person",
        capacity: 30,
        price: 45,
        startDate: "2025-08-15",
        endDate: "2025-08-15"
      },
      {
        venueId: null,
        groupId: 3,
        name: "Virtual Bowling Lessons",
        description: "Learn to bowl from the comfort of your couch",
        type: "Online",
        capacity: 200,
        price: 0,
        startDate: "2025-07-21",
        endDate: "2025-07-27"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: [
        "Pie Eating Contest",
        "Hay Rides",
        "Beer Tasting",
        "Virtual Bowling Lessons"
      ]
    });
  }
};
