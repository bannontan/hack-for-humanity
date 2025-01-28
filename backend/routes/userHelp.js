import express from "express";
import {
	postHelpReq,
	getHelpReqs,
	getPersonalHelpReqs,
	deleteHelpReq,
	updateHelpReq,
} from "../controllers/helpController.js";

const router = express.Router();

// POST Create location
router.post("/user/loc", postHelpReq);

// GET Get all locations
router.get("/loc/:role", getHelpReqs);

// GET personal help requests
router.get("/user/:userId", getPersonalHelpReqs);

// PATCH Update location
router.patch("/loc/:id", updateHelpReq);

// DELETE Delete location
router.delete("/loc/:id", deleteHelpReq);

export default router;
