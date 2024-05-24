import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, min: 1, required: true },
    reps: { type: Number, min: 1, required: true },
    weights: { type: Number, min: 0 },
    notes: String
});

export default exerciseSchema;
