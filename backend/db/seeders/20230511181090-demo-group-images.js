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
        groupId: 1, // cult culture
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117559987619778630/image.png",
        preview: true
      },
      {
        groupId: 2, // luun
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117558931615654048/blood20moon20small.webp",
        preview: true
      },
      {
        groupId: 3, // eggplant
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117561062867349694/maxresdefault.jpg",
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
