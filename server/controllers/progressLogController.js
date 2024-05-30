import ProgressLog from '../models/ProgressLog.js';

// Create a new progress log
export const createProgressLog = async (req, res) => {
    try {
        const progressLog = new ProgressLog({ ...req.body, user_id: req.user._id });
        await progressLog.save();
        res.status(201).send(progressLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all progress logs for a specific user
export const getAllProgressLogs = async (req, res) => {
    try {
        const progressLogs = await ProgressLog.find({ user_id: req.user._id });
        res.send(progressLogs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a progress log by ID and verify user ownership
export const getProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!progressLog) {
            return res.status(404).send();
        }
        res.send(progressLog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a progress log by ID and verify user ownership
export const updateProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!progressLog) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(progressLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot update a progress log for a past date.' });
        }

        // Update the progress log
        Object.assign(progressLog, req.body);
        await progressLog.save();
        res.send(progressLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a progress log by ID and verify user ownership
export const deleteProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!progressLog) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(progressLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot delete a progress log for a past date.' });
        }

        // Delete the progress log
        await progressLog.remove();
        res.send(progressLog);
    } catch (error) {
        res.status(500).send(error);
    }
};
