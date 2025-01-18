import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const Disaster = sequelize.define("Disaster", {
	event: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	radius: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	severity: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lat: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	lng: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
});

export default Disaster;
