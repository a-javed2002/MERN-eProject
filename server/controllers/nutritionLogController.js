import NutritionLog from '../models/NutritionLog.js';

// Create a new nutrition log
export const createNutritionLog = async (req, res) => {
    try {
        const nutritionLog = new NutritionLog(req.body);
        await nutritionLog.save();
        res.status(201).send(nutritionLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a nutrition log by ID
export const getNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findById(req.params.id).populate('foods');
        if (!nutritionLog) {
            return res.status(404).send();
        }
        res.send(nutritionLog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a nutrition log by ID
export const updateNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!nutritionLog) {
            return res.status(404).send();
        }
        res.send(nutritionLog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a nutrition log by ID
export const deleteNutritionLog = async (req, res) => {
    try {
        const nutritionLog = await NutritionLog.findByIdAndDelete(req.params.id);
        if (!nutritionLog) {
            return res.status(404).send();
        }
        res.send(nutritionLog);
    } catch (error) {
        res.status(500).send(error);
    }
};
