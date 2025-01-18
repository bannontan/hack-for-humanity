import express from "express";
import {
	postHelpReq,
	getHelpReqs,
	deleteHelpReq,
	updateHelpReq,
} from "../controllers/mapController.js";
import { get } from "request";

const router = express.Router();

// POST Create location
router.post("/user/loc", postHelpReq);

// GET Get all locations
router.get("/loc", getHelpReqs);

// PATCH Update location
router.patch("/loc/:id", updateHelpReq);

// DELETE Delete location
router.delete("/loc/:id", deleteHelpReq);

export default router;
