import ProgressLog from '../models/ProgressLog.js';
import mongoose from 'mongoose';
import UserModel from '../models/UserModel.js';

// Create a new progress log
export const createProgressLog = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.user_id);
        const progressLog = new ProgressLog({ ...req.body, user_id: userId });
        await progressLog.save();

        const user = await UserModel.findById(req.body.user_id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.progress_logs) {
            user.progress_logs = []; // Initialize progress_logs if undefined
        }

        user.progress_logs.push(progressLog);
        await user.save();
        res.status(201).send(progressLog);
    } catch (error) {
        console.error('Error creating progress log:', error);
        res.status(400).send({
            message: 'Error creating progress log',
            error: error.message,
        });
    }
};

// Get all progress logs for a specific user
export const getAllProgressLogs = async (req, res) => {
    try {
        const { user_id } = req.body;
        const progressLogs = await ProgressLog.find({ user_id: "665612cf2d30a599cfd3b805" });
        res.send(progressLogs);
    } catch (error) {
        console.error('Error fetching all progress logs:', error);
        res.status(500).send({
            message: 'Error fetching all progress logs',
            error: error.message,
        });
    }
};

// Get a progress log by ID and verify user ownership
export const getProgressLog = async (req, res) => {
    try {
        const { user, params } = req;
        const progressLog = await ProgressLog.findOne({ _id: params.id, user_id: user._id });

        if (!progressLog) {
            return res.status(404).send({ message: 'Progress log not found' });
        }

        res.send(progressLog);
    } catch (error) {
        console.error('Error fetching progress log:', error);
        res.status(500).send({
            message: 'Error fetching progress log',
            error: error.message,
        });
    }
};

// Update a progress log by ID and verify user ownership
export const updateProgressLog = async (req, res) => {
    try {
        const { user, params, body } = req;
        const progressLog = await ProgressLog.findOne({ _id: params.id, user_id: user._id });

        if (!progressLog) {
            return res.status(404).send({ message: 'Progress log not found' });
        }

        if (new Date(progressLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot update a progress log for a past date.' });
        }

        Object.assign(progressLog, body);
        await progressLog.save();
        res.send(progressLog);
    } catch (error) {
        console.error('Error updating progress log:', error);
        res.status(400).send({
            message: 'Error updating progress log',
            error: error.message,
        });
    }
};

// Delete a progress log by ID and verify user ownership
export const deleteProgressLog = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.user_id);
        const progressLog = await ProgressLog.findOne({ _id: req.params.id, user_id: user._id });

        if (!progressLog) {
            return res.status(404).send({ message: 'Progress log not found' });
        }

        if (new Date(progressLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot delete a progress log for a past date.' });
        }

        await progressLog.remove();
        res.send({ message: 'Progress log deleted successfully' });
    } catch (error) {
        console.error('Error deleting progress log:', error);
        res.status(500).send({
            message: 'Error deleting progress log',
            error: error.message,
        });
    }
};