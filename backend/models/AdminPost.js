import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const AdminPost = sequelize.define("AdminPost", {
	helpType: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	waitingTime: {
		type: DataTypes.INTEGER,
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
	adminId: {
		// Foreign key for linking to User
		type: DataTypes.STRING,
		allowNull: true, // Allows locations with no associated user
		references: {
			model: "Users", // Table name for User model
			key: "id", // Foreign key references User's id
		},
		onDelete: "SET NULL", // Handle cascade rules
		onUpdate: "CASCADE",
	},
	disasterName: {
		// Foreign key for linking to User
		type: DataTypes.STRING,
		allowNull: false, // Allows locations with no associated user
		references: {
			model: "Disasters", // Table name for User model
			key: "name", // Foreign key references User's id
		},
		onDelete: "SET NULL", // Handle cascade rules
		onUpdate: "CASCADE",
	},
});

export default AdminPost;
