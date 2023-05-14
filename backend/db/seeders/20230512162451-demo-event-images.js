'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: "this is image 1 of event 1",
        preview: true
      },
      {
        eventId: 1,
        url: "this is image 2 of event 1",
        preview: false
      },
      {
        eventId: 1,
        url: "this is image 3 of event 1",
        preview: false
      },
      {
        eventId: 2,
        url: "this is image 1 of event 2",
        preview: true
      },
      {
        eventId: 2,
        url: "this is image 2 of event 2",
        preview: false
      },
      {
        eventId: 2,
        url: "this is image 3 of event 2",
        preview: false
      },
      {
        eventId: 4,
        url: "this is image 1 of event 4",
        preview: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: [1, 2, 4]
    });
  }
};
