import express from 'express';
import { createProgressLog, getProgressLog, updateProgressLog, deleteProgressLog } from '../controllers/progressLogController.js';
const router = express.Router();

// Create a new progress log
router.post('/', createProgressLog);

// Get a progress log by ID
router.get('/:id', getProgressLog);

// Update a progress log by ID
router.put('/:id', updateProgressLog);

// Delete a progress log by ID
router.delete('/:id', deleteProgressLog);

export default router;
