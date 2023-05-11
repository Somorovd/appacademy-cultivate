'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.bulkInsert(options, [
      {
        email: "firstUser@email.com",
        username: "User1",
        firstName: "John",
        lastName: "Doe",
        hashedPassword: bcrypt.hashSync("user1 password")
      },
      {
        email: "secondUser@email.com",
        username: "User2",
        firstName: "Joe",
        lastName: "Shmoe",
        hashedPassword: bcrypt.hashSync("user2 password")
      },
      {
        email: "thirdUser@email.com",
        username: "User3",
        firstName: "Kitty",
        lastName: "Kat",
        hashedPassword: bcrypt.hashSync("user3 password")
      },
      {
        email: "fourthUser@email.com",
        username: "User4",
        firstName: "Jason",
        lastName: "Bourne",
        hashedPassword: bcrypt.hashSync("user4 password")
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: ["User1", "User2", "User3", "User4"]
    });
  }
};
