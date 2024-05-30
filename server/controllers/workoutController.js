import Workout from '../models/Workout.js';
import { sendPushNotification } from '../helpers/notification.js';

// Create a new workout
export const createWorkout = async (req, res) => {
    try {
        const workout = new Workout({ ...req.body, user_id: req.user._id });
        await workout.save();

        // Notification logic for workout creation
        const userId = workout.user_id;
        const message = 'A new workout has been created!';
        await sendPushNotification(userId, message);

        res.status(201).send(workout);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all workouts for a specific user
export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user_id: req.user._id });
        res.send(workouts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a workout by ID and verify user ownership
export const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, user_id: req.user._id }).populate('exercises');
        if (!workout) {
            return res.status(404).send();
        }
        res.send(workout);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a workout by ID and verify user ownership
export const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!workout) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(workout.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot update a workout for a past date.' });
        }

        // Update the workout
        Object.assign(workout, req.body);
        await workout.save();

        // Notification logic for workout edit
        const userId = workout.user_id;
        const message = 'A workout has been updated!';
        await sendPushNotification(userId, message);

        res.send(workout);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a workout by ID and verify user ownership
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, user_id: req.user._id });
        
        if (!workout) {
            return res.status(404).send();
        }

        // Check if the date is in the past
        if (new Date(workout.date) < Date.now()) {
            return res.status(400).send({ error: 'Cannot delete a workout for a past date.' });
        }

        // Delete the workout
        await workout.remove();
        res.send(workout);
    } catch (error) {
        res.status(500).send(error);
    }
};
