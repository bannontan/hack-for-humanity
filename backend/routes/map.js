import express from 'express';
import { postLoc, getLocs, updateLoc, deleteLoc } from '../controllers/mapController.js';

const router = express.Router();

// POST Create location
router.post('/user/loc', postLoc);

// GET Get all locations
router.get('/loc', getLocs);

// PATCH Update location
router.patch('/loc/:id', updateLoc);

// DELETE Delete location
router.delete('/loc/:id', deleteLoc);

export default router;