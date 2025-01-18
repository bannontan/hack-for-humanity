import Disaster from "../models/Disaster.js";

import geocodeLocation from "../utils/geocode.js";

// @desc	Post disaster information to Disaster.db
// @route	POST /disaster
export const postDisaster = async (req, res, next) => {
	const { event, city, radius, severity, description, address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const newDisaster = Disaster.build({
			event,
			city,
			radius,
			severity,
			description,
			lat,
			lng,
		});

		await newDisaster.save();
		return res.status(201).json(newDisaster);
	} catch (error) {
		console.log(event, city, radius, severity, description, lat, lng);
		return res.status(500).json(error);
	}
};

// @desc	Get all disaster information from Disaster.db
// @route	GET /disaster
export const getDisaster = async (req, res, next) => {
	let disasterInfos;
		try {
			disasterInfos = await Disaster.findAll();
			return res.status(200).json(disasterInfos);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Failed to fetch disaster", error });
		}
};

// @desc	Update disaster information in Disaster.db
// @route	PATCH /disaster
export const updateDisaster = async (req, res, next) => {
	const { event, city, radius, severity, description, address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const disasterInfo = await Disaster.findOne({ where: { lat, lng } });
		if (!lat || !lng) {
			return res.status(404).json({ message: "Disaster not found" });
		}
		disasterInfo.event = event;
		disasterInfo.city = city;
		disasterInfo.radius = radius;
		disasterInfo.severity = severity;
		disasterInfo.description = description;
		disasterInfo.lat = lat;
		disasterInfo.lng = lng;
		await disasterInfo.save();
		return res.status(200).json(disasterInfo);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Delete disaster information in Disaster.db
// @route	Delete /disaster
export const deleteDisaster = async (req, res, next) => {
	const { address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const disasterInfo = await Disaster.findOne({ where: { lat, lng } });
		if (!lat || !lng) {
			return res
				.status(404)
				.json({ message: "Disaster not found" });
		}
		await disasterInfo.destroy();
		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
};
