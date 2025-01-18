import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const AdminPost = sequelize.define("AdminPost", {
	event: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	helpType: {
		type: DataTypes.STRING,
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
	waitingTime: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

export default AdminPost;
