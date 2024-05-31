import Workout from '../models/Workout.js';
import { sendPushNotification } from '../helpers/notification.js';
import UserModel from '../models/UserModel.js';
import mongoose from 'mongoose';

// Create a new workout
export const createWorkout = async (req, res) => {
    try {
        // Convert req.user._id to ObjectId
        const userId = new mongoose.Types.ObjectId(req.body.user_id);

        // Create a new workout with user_id
        const workout = new Workout({ ...req.body, user_id: userId });
        await workout.save();

        // Find the user by _id
        const user = await UserModel.findById(req.body.user_id);

        // If user is not found, return 404
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!user.workout_routines) {
            user.workout_routines = []; // Initialize workouts property if it's undefined
        }

        // Append the new workout to the user's workouts field
        user.workout_routines.push(workout);
        await user.save();

        // Notification logic for workout creation
        const message = 'A new workout has been created!';
        await sendPushNotification(userId, message);

        res.status(201).send(workout);
    } catch (error) {
        console.error('Error creating workout:', error); // Log the error details
        res.status(400).send({
            message: 'Error creating workout',
            error: error.message, // Include the error message in the response
        });
    }
};

// Get all workouts for a specific user
export const getAllWorkouts = async (req, res) => {
    try {
        const userId = req.user_id;
        const workouts = await Workout.find({ user_id: "665612cf2d30a599cfd3b805" });

        if (workouts.length === 0) {
            return res.status(404).send({ message: 'No workouts found for this user' });
        }

        res.send(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).send({
            message: 'Error fetching workouts',
            error: error.message,
        });
    }
};

// Get a workout by ID and verify user ownership
export const getWorkout = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user_id);
        const workout = await Workout.findOne({ _id: req.params.id, user_id: userId }).populate('exercises');
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.send(workout);
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).send({
            message: 'Error fetching workout',
            error: error.message,
        });
    }
};

// Update a workout by ID and verify user ownership
export const updateWorkout = async (req, res) => {
    try {
        const { 
            category, 
            date, 
            exercises, 
            tags, 
            user_id, 
            _id 
        } = req.body;

        const userId = new mongoose.Types.ObjectId(user_id);
        const workout = await Workout.findOne({ _id: _id, user_id: userId });

        if (!workout) {
            return res.status(404).send({ message: 'Workout not found '+_id });
        }

        // Check if the date is in the past
        // if (new Date(workout.date) < Date.now()) {
        //     return res.status(400).send({ error: 'Cannot update a workout for a past date.' });
        // }

        // Update the workout
        Object.assign(workout, req.body);
        await workout.save();

        // Notification logic for workout edit
        const message = 'A workout has been updated!';
        await sendPushNotification(userId, message);

        res.send(workout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(400).send({
            message: 'Error updating workout',
            error: error.message,
        });
    }
};

// Delete a workout by ID and verify user ownership
export const deleteWorkout = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.user_id);
        const workout = await Workout.findOne({ _id: req.params.id, user_id: userId });

        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }

        // Check if the date is in the past
        // if (new Date(workout.date) < Date.now()) {
        //     return res.status(400).send({ error: 'Cannot delete a workout for a past date.' });
        // }

        // Delete the workout
        await Workout.deleteOne({ _id: req.params.id, user_id: userId });

        // Notification logic for workout deletion
        const message = 'A workout has been deleted!';
        await sendPushNotification(userId, message);

        res.send({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).send({
            message: 'Error deleting workout',
            error: error.message,
        });
    }
};
