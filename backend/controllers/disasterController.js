import Disaster from "../models/Disaster.js";

import geocodeLocation from "../utils/geocode.js";

// @desc	Post disaster information to Disaster.db
// @route	POST /disaster
export const postDisaster = async (req, res, next) => {
	const { name, event, city, radius, severity, description, address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const newDisaster = Disaster.build({
			name,
			event,
			city,
			radius,
			severity,
			description,
			lat,
			lng,
		});

		console.log(newDisaster);

		await newDisaster.save();
		return res.status(201).json(newDisaster);
	} catch (error) {
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
	const { name, event, city, radius, severity, description, address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		// const disasterInfo = await Disaster.findOne({ where: { lat, lng } });
		const disasterInfo = await Disaster.findOne({ where: { name } });
		// if (!lat || !lng) {
		if (!name) {
			return res.status(404).json({ message: "Disaster not found" });
		}
		disasterInfo.name = name;
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
	// const { address } = req.body;
	// const { lat, lng } = await geocodeLocation(address);
	// try {
	// 	const disasterInfo = await Disaster.findOne({ where: { lat, lng } });
	// if (!lat || !lng) {
	const { name } = req.body;
	try {
		const disasterInfo = await Disaster.findOne({ where: { name } });
		if (!name) {
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
