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
        email: "jspends@email.com",
        username: "CluelessJack84",
        firstName: "Clueless",
        lastName: "Jack",
        hashedPassword: bcrypt.hashSync("user1 password")
      },
      {
        email: "preacherjeremiah@email.com",
        username: "JPreach",
        firstName: "Jeremiah",
        lastName: "Shepherd",
        hashedPassword: bcrypt.hashSync("user4 password")
      },
      {
        email: "wolfgang.sol@email.com",
        username: "BrerWolf",
        firstName: "Wolfgang",
        lastName: "Sol",
        hashedPassword: bcrypt.hashSync("user2 password")
      },
      {
        email: "starryeyes@email.com",
        username: "StarryEyesXO",
        firstName: "Roxanne",
        lastName: "Starling",
        hashedPassword: bcrypt.hashSync("user3 password")
      },
      {
        email: "demo-user@email.com",
        username: "_demo_overlord_",
        firstName: "Demo",
        lastName: "Overlord",
        hashedPassword: bcrypt.hashSync("demo password")
      },
      {
        email: "user1@email.com",
        username: "User1",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user2@email.com",
        username: "User2",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user3@email.com",
        username: "User3",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user4@email.com",
        username: "User4",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user5@email.com",
        username: "User5",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user6@email.com",
        username: "User6",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user7@email.com",
        username: "User7",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user8@email.com",
        username: "User8",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user9@email.com",
        username: "User9",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user10@email.com",
        username: "User10",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        email: "user11@email.com",
        username: "User11",
        firstName: "User",
        lastName: "Name",
        hashedPassword: bcrypt.hashSync("password")
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: ["CluelessJack84", "BrerWolf", "StarryEyesXO", "JPreach",
        "User1",
        "User2",
        "User3",
        "User4",
        "User5",
        "User6",
        "User7",
        "User8",
        "User9",
        "User10",
        "User11",
      ]
    });
  }
};
