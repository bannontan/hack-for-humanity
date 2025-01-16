import express from "express";

import {
	getUser,
	deleteUser,
	createUser,
	loginUser,
} from "../controllers/authUserController.js";

const router = express.Router();

// GET Get user
router.get("/:id", getUser);

// Sign up user
// POST Create user
router.post("/signup", createUser);

// DELETE Delete user
router.delete("/:id", deleteUser);

// user login
router.post("/login", loginUser);

export default router;
