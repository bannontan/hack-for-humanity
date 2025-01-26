import sequelize from "./connection.js";
import User from "../../models/User.js";
import Locations from "../../models/UserHelp.js";
import Disaster from "../../models/Disaster.js";
import AdminPost from "../../models/AdminPost.js";
import UserHelp from "../../models/UserHelp.js";
import defineAssociations from "../../models/Associations.js";
import { addAdminUser, createUser } from "../../controllers/authUserController.js";
import { postHelpReq } from "../../controllers/helpController.js";

// Initialize associations
defineAssociations();


console.log("UserHelp Associations:", UserHelp.associations);


// Sync database models (optional)
sequelize
	.sync({ force: true }) // Update tables without dropping data
	.then(() => console.log("Database synchronized"))
	.catch((err) => console.error("Database sync error:", err));


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
	} 
	// finally {
	// 	await sequelize.close();
	// }
})();



export { sequelize, User, Locations, Disaster, AdminPost , UserHelp };

