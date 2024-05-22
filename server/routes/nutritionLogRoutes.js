import express from 'express';
import { createNutritionLog, getNutritionLog, updateNutritionLog, deleteNutritionLog } from '../controllers/nutritionLogController.js';
const router = express.Router();

// Create a new nutrition log
router.post('/', createNutritionLog);

// Get a nutrition log by ID
router.get('/:id', getNutritionLog);

// Update a nutrition log by ID
router.put('/:id', updateNutritionLog);

// Delete a nutrition log by ID
router.delete('/:id', deleteNutritionLog);

export default router;
