import AdminPost from "../models/AdminPost.js";

import geocodeLocation from "../utils/geocode.js";

// @desc	Post new AdminPost information to AdminPost.db
// @route	POST /adminpost/:adminId
export const postAdminPost = async (req, res, next) => {
	const adminId = req.params.adminId;
	const { helpType, waitingTime, description, address, disasterName } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const adminPost = AdminPost.build({
			helpType,
			waitingTime,
			description,
			address,
			lat,
			lng,
			adminId,
			disasterName,
		});

		await adminPost.save();
		return res.status(201).json(adminPost);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Get all admin posts from AdminPost.db
// @route	GET /adminpost
export const getAdminPost = async (req, res, next) => {
	let adminPosts;
		try {
			adminPosts = await AdminPost.findAll();
			return res.status(200).json(adminPosts);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Failed to fetch disaster", error });
		}
};

// @desc	Update admin post information in AdminPost.db
// @route	PATCH /adminpost
export const updateAdminPost = async (req, res, next) => {
	const { helpType, waitingTime, description, address, disasterName } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const adminPost = await AdminPost.findOne({ where: { lat, lng } });
		if (!lat || !lng) {
			return res.status(404).json({ message: "Post not found" });
		}
		adminPost.helpType = helpType;
		adminPost.waitingTime = waitingTime;
		adminPost.description = description;
		adminPost.address = address;
		adminPost.lat = lat;
		adminPost.lng = lng;
		adminPost.disasterName = disasterName;
		await adminPost.save();
		return res.status(200).json(adminPost);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Delete admin post information in AdminPost.db
// @route	Delete /adminpost
export const deleteAdminPost = async (req, res, next) => {
	const { address } = req.body;
	const { lat, lng } = await geocodeLocation(address);
	try {
		const adminPost = await AdminPost.findOne({ where: { lat, lng } });
		if (!lat || !lng) {
			return res
				.status(404)
				.json({ message: "Post not found" });
		}
		await adminPost.destroy();
		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
};
