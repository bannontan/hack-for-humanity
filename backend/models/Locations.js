import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const Locations = sequelize.define("Locations", {
	lat: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	lng: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	radius: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: { // Foreign key for linking to User
		type: DataTypes.STRING,
		allowNull: true, // Allows locations with no associated user
		references: {
			model: "Users", // Table name for User model
			key: "id", // Foreign key references User's id
		},
		onDelete: "SET NULL", // Handle cascade rules
		onUpdate: "CASCADE",
	},
});

export default Locations;
