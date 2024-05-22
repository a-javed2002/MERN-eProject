import mongoose from "mongoose";const exerciseSchema = require('./Exercise');

const workoutSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tags: [{ type: String, required: true }],
    date: { type: Date, default: Date.now, required: true },
    exercises: [exerciseSchema]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
