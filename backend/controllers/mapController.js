import Locations from '../models/Locations.js';
import User from '../models/User.js';

import geocodeLocation from '../utils/geocode.js';

// @desc	Post location to db
// @route	POST /map/user/location
export const postLoc = async (req, res, next) => {
	const { address, description, radius, type, userId } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const newLoc = Locations.build({
			lat,
			lng,
			description,
			radius,
			type,
			userId,
		});

		await newLoc.save();
		return res.status(201).json(newLoc);
	} catch (error) {
		console.log(lat, lng, description, radius, type, userId);
		return res.status(500).json(error);
	}
};

// @desc	Get all locations from db
// @route	GET /map/loc
export const getLocs = async (req, res, next) => {
    const role = req.body.role;
    let locations;

    try {
        if (role !== "admin") {
            // Fetch locations where associated User role is "admin"
            locations = await Locations.findAll({
                include: [
                    {
                        model: User,
                        as: "user", // Alias defined in the association
                        where: { role: "admin" }, // Filter based on User role
                    },
                ],
            });
        } else {
            // Fetch all locations regardless of User role
            locations = await Locations.findAll({
                include: [
                    {
                        model: User,
                        as: "user", // Alias defined in the association
                    },
                ],
            });
        }
        return res.status(200).json(locations);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch locations", error });
    }
};

// @desc	Update location in db using location id
// @route	Update /map/loc/:id
export const updateLoc = async (req, res, next) => {
	const { id } = req.params;
	const { lat, lng, description, radius, type, userId } = req.body;
	try {
		const loc = await Locations.findOne({ where: { id } });
		if (!loc) {
			return res.status(404).json({ message: "Location not found" });
		}
		loc.lat = lat;
		loc.lng = lng;
		loc.description = description;
		loc.radius = radius;
		loc.type = type;
		loc.userId = userId;

		await loc.save();
		return res.status(200).json(loc);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Delete location in db using location id
// @route	Delete /map/loc/:id
export const deleteLoc = async (req, res, next) => {
	const { id } = req.params;
	try {
		const loc = await Locations.findOne({ where: { id } });
		if (!loc) {
			return res.status(404).json({ message: "Location not found" });
		}
		await loc.destroy();
		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
};