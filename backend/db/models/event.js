'use strict';

const { Model } = require('sequelize');
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.EventImage, { foreignKey: "eventId" });
      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: "eventId", otherKey: "userId"
      });
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "cascade"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("in person", "online"),
      defaultValue: "in person"
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Event',
    scopes: {
      getPreviewImage() {
        const { EventImage } = require("../models");
        return {
          include: {
            model: EventImage,
            attributes: ["url"],
            where: { "preview": true },
            limit: 1,
            required: false
          }
        }
      },
      general() {
        const { Group, Venue } = require("../models");
        return {
          attributes: ["id", "name", "type", "groupId", "venueId", "startDate", "endDate"],
          include: [
            { model: Group, attributes: ["id", "name", "city", "state"] },
            { model: Venue, attributes: ["id", "city", "state"] }
          ],
        }
      },
      details() {
        const { Group, EventImage, Venue } = require("../models");
        return {
          attributes: ["capacity", "description", "price"],
          include: [
            { model: Group, attributes: ["private"] },
            { model: Venue, attributes: ["lat", "lng"] },
            { model: EventImage, attributes: ["id", "url", "preview"] }
          ]
        }
      },
      filterByGroups(groupIds) {
        return { where: { "groupId": groupIds } }
      },
      filterByEvents(eventIds) {
        return { where: { "id": eventIds } }
      },
      getAttendees(isHost) {
        const { User } = require("../models");
        const where = (isHost) ? {} : { "status": { [Op.ne]: "pending" } }
        return {
          attributes: [],
          include: {
            model: User,
            attributes: ["id", "firstName", "lastName"],
            through: { attributes: ["status"], where: where }
          }
        }
      }
    }
  });
  return Event;
};