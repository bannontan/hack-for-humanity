import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const User = sequelize.define("User", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

export default User;
