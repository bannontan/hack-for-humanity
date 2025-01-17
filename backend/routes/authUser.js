import express from "express";

import {
	getUser,
	deleteUser,
	createUser,
	loginUser,
} from "../controllers/authUserController.js";
import { authenticate } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

// GET Get user
router.get("/:id", authenticate, getUser);

// Sign up user
// POST Create user
router.post("/signup", createUser);

// DELETE Delete user
router.delete("/:id", authenticate, deleteUser);

// user login
router.post("/login", loginUser);

export default router;
