'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class EventImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			EventImage.belongsTo(models.Event, { foreignKey: "eventId" });
		}
	}
	EventImage.init({
		eventId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			onDelete: "cascade"
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		preview: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		sequelize,
		modelName: 'EventImage',
	});
	return EventImage;
};
