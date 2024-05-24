import mongoose from "mongoose";
import foodSchema from "./Food.js";

const nutritionLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now, required: true },
    meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snacks'], required: true },
    foods: [foodSchema]
});

const NutritionLog = mongoose.model('NutritionLog', nutritionLogSchema);

export default NutritionLog;
