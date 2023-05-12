'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Group.hasMany(models.Event, {foreignKey: "groupId"});
      // Group.belongsTo(models.User, {foreignKey: "organizerId"});
      // Group.belongsToMany(models.User, {
      //   through: models.Membership,
      //   foreignKey: "groupId", otherKey: "userId"
      // });
      // Group.hasMany(models.Venue, { foreignKey: "groupId" });
      // Group.hasMany(models.GroupImage, { foreignKey: "groupId" });
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
  });
  return Group;
};