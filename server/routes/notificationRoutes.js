import express from 'express';
import { createNotification, getNotification, updateNotification, deleteNotification } from '../controllers/notificationController.js';
const router = express.Router();

// Create a new notification
router.post('/', createNotification);

// Get a notification by ID
router.get('/:id', getNotification);

// Update a notification by ID
router.put('/:id', updateNotification);

// Delete a notification by ID
router.delete('/:id', deleteNotification);

export default router;
