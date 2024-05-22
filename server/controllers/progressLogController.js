import ProgressLog from '../models/ProgressLog.js';

// Create a new progress log
export const createProgressLog = async (req, res) => {
    try {
        const progressLog = new ProgressLog(req.body);
        await progressLog.save();
        res.status(201).send(progressLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a progress log by ID
export const getProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findById(req.params.id);
        if (!progressLog) {
            return res.status(404).send();
        }
        res.send(progressLog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a progress log by ID
export const updateProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!progressLog) {
            return res.status(404).send();
        }
        res.send(progressLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a progress log by ID
export const deleteProgressLog = async (req, res) => {
    try {
        const progressLog = await ProgressLog.findByIdAndDelete(req.params.id);
        if (!progressLog) {
            return res.status(404).send();
        }
        res.send(progressLog);
    } catch (error) {
        res.status(500).send(error);
    }
};
