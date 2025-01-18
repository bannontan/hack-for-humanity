import express from "express";
import {
	postDisaster,
	getDisaster,
	updateDisaster,
	deleteDisaster,
} from "../controllers/disasterController.js";

const router = express.Router();

// POST Create location
router.post("/", postDisaster);

// GET Get all locations
router.get("/", getDisaster);

// PATCH Update location
router.patch("/", updateDisaster);

// DELETE Delete location
router.delete("/", deleteDisaster);

export default router;
