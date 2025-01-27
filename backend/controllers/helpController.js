import UserHelp from "../models/UserHelp.js";
import User from "../models/User.js";

import geocodeLocation from "../utils/geocode.js";

// @desc	Post help request to UserHelp.db
// @route	POST /map/user/location
export const postHelpReq = async (req, res, next) => {
	const { address, description, type, userId } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const newUserHelpReq = UserHelp.build({
			lat,
			lng,
			description,
			type,
			userId,
		});

		await newUserHelpReq.save();
		return res.status(201).json(newUserHelpReq);
	} catch (error) {
		console.log(lat, lng, description, type, userId);
		return res.status(500).json(error);
	}
};

// @desc	Get all user help requests from UserHelp.db
// @route	GET /map/loc/:role
export const getHelpReqs = async (req, res, next) => {
	const role = req.params.role;
	let userHelpReqs;

	try {
		if (role !== "admin") {
			// Fetch UserHelp where associated User role is "admin"
			userHelpReqs = await UserHelp.findAll({
				include: [
					{
						model: User,
						as: "user", // Alias defined in the association
						where: { role: "admin" }, // Filter based on User role
					},
				],
			});
		} else {
			// Fetch all UserHelp regardless of User role
			userHelpReqs = await UserHelp.findAll({
				include: [
					{
						model: User,
						as: "user", // Alias defined in the association
					},
				],
			});
		}
		return res.status(200).json(userHelpReqs);
	} catch (error) {
        console.error("Error fetching user help requests:", error.message);
        return res.status(500).json({ 
            message: "Failed to fetch user help requests", 
            error: error.message 
        });
    }
};

// @desc	Update help request in UserHelp.db using id (primary key)
// @route	Update /map/loc/:id
export const updateHelpReq = async (req, res, next) => {
	const { id } = req.params;
	const { lat, lng, description, type, userId } = req.body;
	try {
		const userHelpReq = await UserHelp.findOne({ where: { id } });
		if (!loc) {
			return res.status(404).json({ message: "Location not found" });
		}
		userHelpReq.lat = lat;
		userHelpReq.lng = lng;
		userHelpReq.description = description;
		userHelpReq.type = type;
		userHelpReq.userId = userId;

		await userHelpReq.save();
		return res.status(200).json(userHelpReq);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Delete help request in UserHelp.db using id (primary key)
// @route	Delete /map/loc/:id
export const deleteHelpReq = async (req, res, next) => {
	const { id } = req.params;
	try {
		const userHelpReq = await UserHelp.findOne({ where: { id } });
		if (!userHelpReq) {
			return res
				.status(404)
				.json({ message: "User help request not found" });
		}
		await userHelpReq.destroy();
		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
};
