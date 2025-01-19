import express from "express";
import {
	postAdminPost,
	getAdminPost,
	updateAdminPost,
	deleteAdminPost,
} from "../controllers/adminPostController.js";

const router = express.Router();

// POST Create location
router.post("/:adminId", postAdminPost);

// GET Get all locations
router.get("/", getAdminPost);

// PATCH Update location
router.patch("/", updateAdminPost);

// DELETE Delete location
router.delete("/", deleteAdminPost);

export default router;
