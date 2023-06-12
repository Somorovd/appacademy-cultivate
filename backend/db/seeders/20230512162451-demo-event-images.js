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
        eventId: 1, //harmonizing energies
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117545885769941225/Untitled.png",
        preview: true
      },
      {
        eventId: 2, // communal living
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117558539993485395/groups-TW-600x321.jpg",
        preview: true
      },
      {
        eventId: 3, // cosmic whispers
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117548034809667704/artworks-000114057493-qz0krf-t500x500.jpg",
        preview: true
      },
      {
        eventId: 4, // power of giving
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117548742552342568/iStock-1283011874.jpg",
        preview: true
      },
      {
        eventId: 5, // half moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117550915919040613/Untitled.jpg",
        preview: true
      },
      {
        eventId: 6, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117555755588010014/20-1024x768.jpg",
        preview: true
      },
      {
        eventId: 7, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117555755588010014/20-1024x768.jpg",
        preview: true
      },
      {
        eventId: 8, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117555755588010014/20-1024x768.jpg",
        preview: true
      },
      {
        eventId: 9, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117555755588010014/20-1024x768.jpg",
        preview: true
      },
      {
        eventId: 10, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117553450398527578/Untitled.jpg",
        preview: true
      },
      {
        eventId: 11, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117553450398527578/Untitled.jpg",
        preview: true
      },
      {
        eventId: 12, // waning moon
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117553450398527578/Untitled.jpg",
        preview: true
      },
      {
        eventId: 13, // hunt
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117556996661584094/image-w1280.webp",
        preview: true
      },
      {
        eventId: 14, // eggplant
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117557425663393812/two-eggplants-on-a-wooden-table.jpg",
        preview: true
      },
      {
        eventId: 15, // flower
        url: "https://cdn.discordapp.com/attachments/723759214123679836/1117562127893405818/awesome-desktop-wallpapers-hd.jpg",
        preview: true
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
