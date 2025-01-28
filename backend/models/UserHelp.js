import { DataTypes } from "sequelize";
import sequelize from "../utils/db/connection.js";

const UserHelp = sequelize.define("UserHelp", {
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
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
	type: {
		// helpType
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "Pending",
	},
	userId: {
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
});

export default UserHelp;
