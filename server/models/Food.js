import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true },
    calories: { type: Number, min: 0, required: true },
    macros: {
        protein: { type: Number, min: 0 },
        carbs: { type: Number, min: 0 },
        fat: { type: Number, min: 0 }
    }
});

export default foodSchema;
