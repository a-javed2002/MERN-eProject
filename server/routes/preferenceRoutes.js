import express from 'express';
import { createPreference, getPreference, updatePreference, deletePreference,getAllProgressLog } from '../controllers/preferenceController.js';
const router = express.Router();

// Create a new preference
router.post('/', createPreference);

// Get all users
router.get('/', getAllProgressLog);

// Get a preference by ID
router.get('/:id', getPreference);

// Update a preference by ID
router.put('/:id', updatePreference);

// Delete a preference by ID
router.delete('/:id', deletePreference);

export default router;
