import sequelize from "./connection.js";
import User from "../../models/User.js"; // Needed to sync to sequelize
import UserHelp from "../../models/UserHelp.js"; // Needed to sync to sequelize
import Disaster from "../../models/Disaster.js"; // Needed to sync to sequelize
import AdminPost from "../../models/AdminPost.js"; // Needed to sync to sequelizes
import { addAdminUser } from "../../controllers/authUserController.js";

(async () => {
	try {
		await sequelize.sync({ force: true }); // Drops and recreates tables
		console.log("Database synced successfully.");
		await addAdminUser();
	} catch (err) {
		console.error("Error syncing database:", err.message);
	} finally {
		await sequelize.close();
	}
})();
