import mongoose from "mongoose";
// Define schema for basic profile information
const basicInfoSchema = new mongoose.Schema({
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, min: 0, required: true },
    height: { type: Number, min: 0, required: true },
    weight: { type: Number, min: 0 },
    // Add more fields as needed
});

// Define schema for exercise in workout routine
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, min: 1, required: true },
    reps: { type: Number, min: 1, required: true },
    weights: { type: Number, min: 0 },
    notes: String
});

// Define schema for food item logged in nutrition
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

// Define schema for user model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    profile_picture: { type: String, default: 'default_profile.jpg' },
    basic_info: { type: basicInfoSchema, required: true },
    workout_routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    nutrition_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NutritionLog' }],
    progress_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }]
});

// Define schema for workout model
const workoutSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tags: [{ type: String, required: true }],
    date: { type: Date, default: Date.now, required: true },
    exercises: [exerciseSchema]
});

// Define schema for nutrition log model
const nutritionLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now, required: true },
    meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snacks'], required: true },
    foods: [foodSchema]
});

// Define schema for progress log model
const progressLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now, required: true },
    weight: { type: Number, min: 0 },
    body_measurements: {
        chest: { type: Number, min: 0 },
        waist: { type: Number, min: 0 },
        hips: { type: Number, min: 0 }
        // Add more measurements as needed
    },
    performance_metrics: {
        run_times: { type: Number, min: 0 },
        lifting_weights: { type: Number, min: 0 }
        // Add more metrics as needed
    }
});

const notificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // Type of notification (e.g., workout completion, goal achievement)
    action: { type: String, required: true }, // Action triggering the notification
    timestamp: { type: Date, default: Date.now, required: true } // Timestamp of the notification
});

const preferenceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notification_preferences: {
        workout_reminders: { type: Boolean, default: true },
        goal_achievements: { type: Boolean, default: true },
        new_followers: { type: Boolean, default: true },
        forum_responses: { type: Boolean, default: true }
    },
    units_of_measurement: { type: String, enum: ['imperial', 'metric'], default: 'metric' }, // Units of measurement preference
    theme: { type: String, default: 'light' } // Theme preference
});

const supportSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true }, // Subject of the feedback/support request
    message: { type: String, required: true }, // Content of the feedback/support request
    timestamp: { type: Date, default: Date.now, required: true } // Timestamp of the feedback/support request
});

// Create models
const User = mongoose.model('User', userSchema);
const Workout = mongoose.model('Workout', workoutSchema);
const NutritionLog = mongoose.model('NutritionLog', nutritionLogSchema);
const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Preference = mongoose.model('Preference', preferenceSchema);
const Support = mongoose.model('Support', supportSchema);

module.exports = { User, Workout, NutritionLog, ProgressLog,Notification,Preference,Support };

