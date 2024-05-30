import Notification from '../models/Notification.js';

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all notification
export const getAllNotification = async (req, res) => {
    try {
        const notification = await Notification.find();
        res.send(notification);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a notification by ID
export const getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).send();
        }
        res.send(notification);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a notification by ID
export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!notification) {
            return res.status(404).send();
        }
        res.send(notification);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a notification by ID
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).send();
        }
        res.send(notification);
    } catch (error) {
        res.status(500).send(error);
    }
};
