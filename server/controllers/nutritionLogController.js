import NutritionLog from '../models/NutritionLog.js';
import mongoose from 'mongoose';
import UserModel from '../models/UserModel.js';

// Create a new nutrition log
export const createNutritionLog = async (req, res) => {
    try {
        // const { user, body } = req;
        // const userId = new mongoose.Types.ObjectId(req.body.user_id);
        // const nutritionLog = new NutritionLog({ ...body, user_id: userId });
        // await nutritionLog.save();
        // Convert req.user._id to ObjectId
        const userId = new mongoose.Types.ObjectId(req.body.user_id);

        // Create a new workout with user_id
        const nutritionLog = new NutritionLog({ ...req.body, user_id: userId });
        await nutritionLog.save();

        // Find the user by _id
        const user = await UserModel.findById(req.body.user_id);

        // If user is not found, return 404
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.nutrition_logs) {
            user.nutrition_logs = []; // Initialize workouts property if it's undefined
        }

        // Append the new workout to the user's workouts field
        user.nutrition_logs.push(nutritionLog);
        await user.save();
        res.status(201).send(nutritionLog);
    } catch (error) {
        console.error('Error creating nutrition log:', error);
        res.status(400).send({
            message: 'Error creating nutrition log',
            error: error.message,
        });
    }
};

// Get all nutrition logs for a specific user
export const getAllNutritionLogs = async (req, res) => {
    try {
        const { user_id } = req.body;
        const nutritionLogs = await NutritionLog.find({ user_id: "665612cf2d30a599cfd3b805" });
        res.send(nutritionLogs);
    } catch (error) {
        console.error('Error fetching all nutrition logs:', error);
        res.status(500).send({
            message: 'Error fetching all nutrition logs',
            error: error.message,
        });
    }
};

// Get a nutrition log by ID and verify user ownership
export const getNutritionLog = async (req, res) => {
    try {
        const { user, params } = req;
        const nutritionLog = await NutritionLog.findOne({ _id: params.id, user_id: user._id });
        if (!nutritionLog) {
            return res.status(404).send({ message: 'Nutrition log not found' });
        }
        res.send(nutritionLog);
    } catch (error) {
        console.error('Error fetching nutrition log:', error);
        res.status(500).send({
            message: 'Error fetching nutrition log',
            error: error.message,
        });
    }
};

// Update a nutrition log by ID and verify user ownership
export const updateNutritionLog = async (req, res) => {
    try {
        const { user, params, body } = req;
        const nutritionLog = await NutritionLog.findOne({ _id: params.id, user_id: user._id });
        
        if (!nutritionLog) {
            return res.status(404).send({ message: 'Nutrition log not found' });
        }

        // Check if the date is in the past
        if (new Date(nutritionLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot update a log for a past date.' });
        }

        Object.assign(nutritionLog, body);
        await nutritionLog.save();
        res.send(nutritionLog);
    } catch (error) {
        console.error('Error updating nutrition log:', error);
        res.status(400).send({
            message: 'Error updating nutrition log',
            error: error.message,
        });
    }
};

// Delete a nutrition log by ID and verify user ownership
export const deleteNutritionLog = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.user_id);
        const nutritionLog = await NutritionLog.findOne({ _id: req.params.id, user_id: userId});
        
        if (!nutritionLog) {
            return res.status(404).send({ message: 'Nutrition log not found' });
        }

        // Check if the date is in the past
        if (new Date(nutritionLog.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot delete a log for a past date.' });
        }

        await nutritionLog.remove();
        res.send({ message: 'Nutrition log deleted successfully' });
    } catch (error) {
        console.error('Error deleting nutrition log:', error);
        res.status(500).send({
            message: 'Error deleting nutrition log',
            error: error.message,
        });
    }
};
