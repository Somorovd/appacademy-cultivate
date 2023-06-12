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
        organizerId: 2,
        name: "Cult Culture",
        about: `
        Cult Culture is a group focused on exploring the fascinating world of cults 
        in a beginner friendly manner for those yet uninitiated. Membership to a cult
        is not requirement for joining and we'll be sure to get you into one ASAP,
        so have no fear. We hold very popular evening session that cover topics 
        ranging from "How long is eternity really?" to "Wheres my wife?" We'd love
        to see you there. 
        `,
        type: "In Person",
        private: false,
        city: "Salem",
        state: "MA"
      },
      {
        organizerId: 3,
        name: "Brotherhood of Luun",
        about: `
        We are a unique congregation dedicated to the worship and adoration of 
        the moon in all its ethereal splendor. Discover the secrets of the moon 
        and its phases and the influence it has on our emotions and destinies.
        We invite you to join our regular moonlit Howls and Meditation, 
        Howls and Dancing, and, of course, our Pure Howls. Experience the 
        restorative power of lunar devotion.
        `,
        type: "In Person",
        private: false,
        city: "Boulder",
        state: "CO"
      },
      {
        organizerId: 4,
        name: "Cult of the Eggplant Harvest",
        about: `
        There is so much to learn about the beauty of nature and the mysteries of 
        divine fertility. Experience the stress-relieving properties of building
        up a steamy sweat beneath the hot hot sun. Let our minds and bodies 
        intertwine for a beautiful and bountiful harvest. 
        `,
        type: "In Person",
        private: false,
        city: "Hollywood",
        state: "CA"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Groups";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: ["Cult Culture"]
    });
  }
};
