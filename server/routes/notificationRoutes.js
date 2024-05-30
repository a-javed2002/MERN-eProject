import express from 'express';
import { createNotification, getNotification, updateNotification, deleteNotification,getAllNotification } from '../controllers/notificationController.js';
const router = express.Router();

// Create a new notification
router.post('/', createNotification);

// Get all users
router.get('/', getAllNotification);

// Get a notification by ID
router.get('/:id', getNotification);

// Update a notification by ID
router.put('/:id', updateNotification);

// Delete a notification by ID
router.delete('/:id', deleteNotification);

export default router;
