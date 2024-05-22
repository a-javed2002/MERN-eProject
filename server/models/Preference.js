import mongoose from "mongoose";
const preferenceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notification_preferences: {
        workout_reminders: { type: Boolean, default: true },
        goal_achievements: { type: Boolean, default: true },
        new_followers: { type: Boolean, default: true },
        forum_responses: { type: Boolean, default: true }
    },
    units_of_measurement: { type: String, enum: ['imperial', 'metric'], default: 'metric' },
    theme: { type: String, default: 'light' }
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
