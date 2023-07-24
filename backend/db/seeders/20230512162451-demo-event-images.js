"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    await queryInterface.bulkInsert(
      options,
      [
        {
          eventId: 1, //harmonizing energies
          url: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c291bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 2, // communal living
          url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 3, // cosmic whispers
          url: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxzcGFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 4, // power of giving
          url: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvbmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 5, // half moon
          url: "https://images.unsplash.com/photo-1588336039249-511b409ec314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhbGYlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          preview: true,
        },
        {
          eventId: 6, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 7, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 8, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 9, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 10, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 11, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 12, // waning moon
          url: "https://images.unsplash.com/photo-1576953855348-4dac88c62c57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNyZXNlbnQlMjBtb29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 13, // hunt
          url: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80/.jpg",
          preview: true,
        },
        {
          eventId: 14, // eggplant
          url: "https://images.unsplash.com/photo-1636974055601-73b62c50af69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVnZ3BsYW50fGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
        {
          eventId: 15, // flower
          url: "https://images.unsplash.com/photo-1516477266610-9e4c763da721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZsb3JhfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60/.jpg",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "EventImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: [1, 2, 4],
    });
  },
};
