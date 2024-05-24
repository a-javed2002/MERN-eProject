import mongoose from "mongoose";
const basicInfoSchema = new mongoose.Schema({
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, min: 0, required: true },
    height: { type: Number, min: 0, required: true },
    weight: { type: Number, min: 0 },
});

export default basicInfoSchema;
