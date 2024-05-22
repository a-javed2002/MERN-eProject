import Workout from '../models/Workout.js';

// Create a new workout
export const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();
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
