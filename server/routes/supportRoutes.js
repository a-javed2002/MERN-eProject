import express from 'express';
import { createSupportRequest, getSupportRequest, updateSupportRequest, deleteSupportRequest } from '../controllers/supportController.js';
const router = express.Router();

// Create a new support request
router.post('/', createSupportRequest);

// Get a support request by ID
router.get('/:id', getSupportRequest);

// Update a support request by ID
router.put('/:id', updateSupportRequest);

// Delete a support request by ID
router.delete('/:id', deleteSupportRequest);

export default router;
