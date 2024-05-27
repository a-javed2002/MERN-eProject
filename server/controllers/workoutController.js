import Workout from '../models/Workout.js';
import { sendPushNotification } from '../helpers/notification.js';

// Create a new workout
export const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body);
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

// Get a workout by ID
export const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('exercises');
        if (!workout) {
            return res.status(404).send();
        }
        res.send(workout);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a workout by ID
export const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!workout) {
            return res.status(404).send();
        }

        // Notification logic for workout edit
        const userId = workout.user_id;
        const message = 'A workout has been updated!';
        await sendPushNotification(userId, message);

        res.send(workout);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a workout by ID
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).send();
        }
        res.send(workout);
    } catch (error) {
        res.status(500).send(error);
    }
};
