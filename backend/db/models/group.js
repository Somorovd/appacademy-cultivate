'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.Event, { foreignKey: "groupId" });
      Group.belongsTo(models.User, { as: "Organizer", foreignKey: "organizerId" });
      Group.belongsToMany(models.User, {
        as: "Member",
        through: models.Membership,
        foreignKey: "groupId", otherKey: "userId"
      });
      Group.hasMany(models.Venue, { foreignKey: "groupId" });
      Group.hasMany(models.GroupImage, { foreignKey: "groupId" });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("in person", "online"),
      defaultValue: "in person"
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Group',
    scopes: {
      getPreviewImage() {
        const { GroupImage } = require("../models");
        return {
          include: {
            model: GroupImage,
            attributes: ["url"],
            where: { "preview": true },
            limit: 1
          }
        }
      },
      filterByMembers(userIds) {
        const { User } = require("../models");
        return {
          include: [{ model: User, as: "Member", attributes: [] }],
          where: { [Op.or]: { "organizerId": userIds, "$Member.id$": userIds } }
        }
      },
      filterByHosts(userIds) {
        const { User } = require("../models");
        return {
          include: [{
            model: User, as: "Member", attributes: [],
            where: { "id": userIds },
            through: { as: "Membership" }
          }],
          where: { "$Member.Membership.status$": "co-host" }
        }
      },
      filterByGroups(groupIds) {
        return { where: { "id": groupIds } }
      },
      details() {
        const { GroupImage, User, Venue } = require("../models");
        return {
          include: [
            { model: GroupImage, attributes: ["id", "url", "preview"] },
            { model: User, as: "Organizer", attributes: ["id", "firstName", "lastName"] },
            { model: Venue }
          ]
        }
      }
    }
  });
  return Group;
};