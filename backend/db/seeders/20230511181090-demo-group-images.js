'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: "this is image 1 of group 1",
        preview: true
      },
      {
        groupId: 1,
        url: "this is image 2 of group 1",
        preview: true
      },
      {
        groupId: 2,
        url: "this is image 1 of group 2",
        preview: true
      },
      {
        groupId: 2,
        url: "this is image 2 of group 2",
        preview: true
      },
      {
        groupId: 2,
        url: "this is image 3 of group 2",
        preview: true
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: [1, 2]
    });
  }
};
