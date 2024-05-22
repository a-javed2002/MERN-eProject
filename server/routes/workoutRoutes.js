import express from 'express';
import { createWorkout, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';
const router = express.Router();

// Create a new workout
router.post('/', createWorkout);

// Get a workout by ID
router.get('/:id', getWorkout);

// Update a workout by ID
router.put('/:id', updateWorkout);

// Delete a workout by ID
router.delete('/:id', deleteWorkout);

export default router;
