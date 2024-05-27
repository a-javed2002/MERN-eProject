import mongoose from "mongoose";
import basicInfoSchema from "./BasicInfo.js";

const fcmTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    loginTime: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    profile_picture: { type: String, default: 'default_profile.jpg' },
    googleId: { type: String, unique: true, sparse: true }, // Google ID field
    basic_info: { type: basicInfoSchema, required: true },
    fcmTokens: [fcmTokenSchema], // Array of FCM tokens and login times
    workout_routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    nutrition_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NutritionLog' }],
    progress_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }]
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
