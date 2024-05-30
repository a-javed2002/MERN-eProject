import NutritionLog from '../models/NutritionLog.js';

// Create a new nutrition log
export const createNutritionLog = async (req, res) => {
    try {
        const nutritionLog = new NutritionLog({ ...req.body, user_id: req.user._id });
        await nutritionLog.save();
        res.status(201).send(nutritionLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all nutrition logs for a specific user
export const getAllNutritionLogs = async (req, res) => {
    try {
        const nutritionLogs = await NutritionLog.find({ user_id: req.user._id });
        res.send(nutritionLogs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a nutrition log by ID and verify user ownership
export const getNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!nutritionLog) {
            return res.status(404).send();
        }
        res.send(nutritionLog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a nutrition log by ID and verify user ownership
export const updateNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!nutritionLog) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(nutritionLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot update a log for a past date.' });
        }

        // Update the log
        Object.assign(nutritionLog, req.body);
        await nutritionLog.save();
        res.send(nutritionLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a nutrition log by ID and verify user ownership
export const deleteNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!nutritionLog) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(nutritionLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot delete a log for a past date.' });
        }

        // Delete the log
        await nutritionLog.remove();
        res.send(nutritionLog);
    } catch (error) {
        res.status(500).send(error);
    }
};
