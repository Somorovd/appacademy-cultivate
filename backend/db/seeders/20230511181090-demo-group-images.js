"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    await queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1, // cult culture
          url: "https://cdn.discordapp.com/attachments/723759214123679836/1117559987619778630/image.png",
          preview: true,
        },
        {
          groupId: 2, // luun
          url: "https://images.unsplash.com/photo-1563923084194-878d186c3ff0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG1vb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          groupId: 3, // eggplant
          url: "https://images.unsplash.com/photo-1658345411059-f6152e4e2dfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80/.jpg",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "GroupImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: [1, 2],
    });
  },
};
