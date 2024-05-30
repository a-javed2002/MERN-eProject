import express from 'express';
import { createWorkout, getWorkout, updateWorkout, deleteWorkout, getAllWorkouts } from '../controllers/workoutController.js';

const router = express.Router();

// Create a new workout
router.post('/',  createWorkout);

// Get all workouts for a specific user
router.get('/',  getAllWorkouts);

// Get a workout by ID
router.get('/:id',  getWorkout);

// Update a workout by ID
router.put('/:id',  updateWorkout);

// Delete a workout by ID
router.delete('/:id',  deleteWorkout);

export default router;