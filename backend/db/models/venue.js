'use strict';
const {
  Model
} = require('sequelize');
var validator = require('validator');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venue.belongsTo(models.Group, { foreignKey: "groupId" });
      Venue.hasMany(models.Event, { foreignKey: "venueId" });
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "set null"
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      isLatLong(value) {
        if (!validator.isLatLong(`${value},${this.lat}`))
          throw new Error("Must be valid lat\/lng pair");
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isLatLong(value) {
          if (!validator.isLatLong(`${value},${this.lng}`))
            throw new Error("Must be valid lat\/lng pair");
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};