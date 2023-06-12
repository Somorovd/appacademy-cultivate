'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Memberships";
    await queryInterface.bulkInsert(options, [
      {
        userId: 2,
        groupId: 1,
        status: "co-host"
      },
      {
        userId: 3,
        groupId: 2,
        status: "co-host"
      },
      {
        userId: 4,
        groupId: 2,
        status: "co-host"
      },
      {
        userId: 5,
        groupId: 1,
        status: "member"
      },
      {
        userId: 5,
        groupId: 2,
        status: "member"
      },
      {
        userId: 6,
        groupId: 1,
        status: "member"
      },
      {
        userId: 6,
        groupId: 2,
        status: "member"
      },
      {
        userId: 6,
        groupId: 3,
        status: "member"
      },
      {
        userId: 7,
        groupId: 1,
        status: "member"
      },
      {
        userId: 7,
        groupId: 2,
        status: "member"
      },
      {
        userId: 7,
        groupId: 3,
        status: "member"
      },
      {
        userId: 8,
        groupId: 1,
        status: "member"
      },
      {
        userId: 8,
        groupId: 2,
        status: "member"
      },
      {
        userId: 8,
        groupId: 3,
        status: "member"
      },
      {
        userId: 9,
        groupId: 1,
        status: "member"
      },
      {
        userId: 9,
        groupId: 3,
        status: "member"
      },
      {
        userId: 10,
        groupId: 1,
        status: "member"
      },
      {
        userId: 10,
        groupId: 2,
        status: "member"
      },
      {
        userId: 10,
        groupId: 3,
        status: "member"
      },
      {
        userId: 11,
        groupId: 1,
        status: "member"
      },
      {
        userId: 12,
        groupId: 1,
        status: "member"
      },
      {
        userId: 13,
        groupId: 1,
        status: "member"
      },
      {
        userId: 14,
        groupId: 1,
        status: "member"
      },
      {
        userId: 14,
        groupId: 2,
        status: "member"
      },
      {
        userId: 15,
        groupId: 1,
        status: "member"
      },
      {
        userId: 15,
        groupId: 2,
        status: "member"
      },
      {
        userId: 16,
        groupId: 1,
        status: "member"
      },
      {
        userId: 16,
        groupId: 2,
        status: "member"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Memberships";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: [1, 2, 3]
    });
  }
};
