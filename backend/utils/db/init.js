import sequelize from "./connection.js";
import User from "../../models/User.js";
import Locations from "../../models/UserHelp.js";
import defineAssociations from "../../models/Associations.js";

// Initialize associations
defineAssociations();

// Sync database models (optional)
sequelize
	.sync({ alter: true }) // Update tables without dropping data
	.then(() => console.log("Database synchronized"))
	.catch((err) => console.error("Database sync error:", err));

export { sequelize, User, Locations };
