import express from 'express';
import { createPreference, getPreference, updatePreference, deletePreference } from '../controllers/preferenceController.js';
const router = express.Router();

// Create a new preference
router.post('/', createPreference);

// Get a preference by ID
router.get('/:id', getPreference);

// Update a preference by ID
router.put('/:id', updatePreference);

// Delete a preference by ID
router.delete('/:id', deletePreference);

export default router;
