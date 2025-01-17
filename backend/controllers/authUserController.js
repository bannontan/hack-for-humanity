import User from "../models/User.js";
import { Sequelize } from "sequelize";

import { generateToken } from "../utils/authentication.js";

// @desc	Create a new user
// @route	POST /user/signup
export const createUser = async (req, res, next) => {
	const { id, username, age, password, role } = req.body;
	try {
		// Check if id or email already exists in the database
		const existingUser = await User.findOne({
			where: {
				[Sequelize.Op.or]: [{ id: id }],
			},
		});

		if (existingUser) {
			const error = new Error(
				"User with this ID or email already exists."
			);
			error.status = 400;
			return next(error);
		}

		const newUser = User.build({
			id,
			username,
			age,
			password,
			role,
		});

		await newUser.save();

		// Generate token
		generateToken(req, res);

		return res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Get user information by id
// @route	GET /user/:id
export const getUser = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			const error = new Error(`User with ${id} not found.`);
			error.status = 404;
			return next(error);
		} else {
			return res.status(200).json(user);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

// @desc	Delete user
// @route	DELETE /user/:id
export const deleteUser = async (req, res, next) => {
	const id = req.params.id;
	try {
		await User.destroy({
			where: {
				id,
			},
		});
		return res
			.status(200)
			.json({ message: `User ${id} deleted successfully` });
	} catch (error) {
		return res.status(400).json(error);
	}
};

//@desc    login user
//@route   POST /user/login
export const loginUser = async (req, res, next) => {
	const { id, password } = req.body;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			const error = new Error("Invalid id.");
			error.status = 401;
			return next(error);
		}

		if (user.password !== password) {
			const error = new Error("Invalid password.");
			error.status = 401;
			return next(error);
		}

		const role = user.role;
		req.body.role = role;

		// Generate token
		generateToken(req, res);

		return res.status(200).json({ ...user.dataValues, bool: true });
	} catch (error) {
		return res.status(500).json(error);
	}
};

// Delete all users
export function deleteAllUsers() {
	User.destroy({
		where: {},
		truncate: true,
	});
}

// Add admin user
export async function addAdminUser() {
	const id = "1";
	const username = "admin";
	const age = 0;
	const password = "adminTesting";
	const role = "admin";
	try {
		// Check if id or email already exists in the database
		const existingUser = await User.findOne({
			where: {
				[Sequelize.Op.or]: [{ id: id }],
			},
		});

		if (existingUser) {
			const error = new Error(
				"User with this ID or email already exists."
			);
			error.status = 400;
			return next(error);
		}

		const newUser = User.build({
			id,
			username,
			age,
			password,
			role,
		});

		await newUser.save();
	} catch (error) {
		return `Error: ${error}`;
	}
}
