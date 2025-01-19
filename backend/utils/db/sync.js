import sequelize from "./connection.js";
import User from "../../models/User.js"; // Needed to sync to sequelize
import UserHelp from "../../models/UserHelp.js"; // Needed to sync to sequelize
import Disaster from "../../models/Disaster.js"; // Needed to sync to sequelize
import AdminPost from "../../models/AdminPost.js"; // Needed to sync to sequelizes
import { addAdminUser, createUser } from "../../controllers/authUserController.js";
import { postHelpReq } from "../../controllers/helpController.js";

// Manually create a mock response object
const mockResponse = () => {
    const res = {
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        json: function (data) {
            this.data = data;
            return this;
        },
    };
    return res;
};

// Mock the `next` function as an empty function
const mockNext = () => {};

// Call your function with mock objects
const res = mockResponse();
const next = mockNext;
(async () => {
	try {
		await sequelize.sync({ force: true }); // Drops and recreates tables
		console.log("Database synced successfully.");
		await addAdminUser();
		await createUser(
			{
				body: {
					id: "2",
					username: "John Doe",
					age: 30,
					password: "password",
					role: "user",
				},
			},
			res,
    		next
		);
		await postHelpReq(
			{
				body: {
					address: "Pacific Palisades",
					description: "Wind got stronger, mom is dying",
					type: "Fire",
					userId: "2",
				},
			},
			res,
    		next
		);
		await postHelpReq(
			{
				body: {
					address: "Altadena",
					description: "Teleportation device broke down",
					type: "Fire",
					userId: "2",
				},
			},
			res,
   			next
		);
		await postHelpReq(
			{
				body: {
					address: "Broadmoor",
					description: "Fell into sinkhole",
					type: "Earthquake",
					userId: "2",
				},
			},
			res,
    		next
		);
	} catch (err) {
		console.error("Error syncing database:", err.message);
	} finally {
		await sequelize.close();
	}
})();
