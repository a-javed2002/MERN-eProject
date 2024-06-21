import mongoose from "mongoose";
import basicInfoSchema from "./BasicInfo.js";

const fcmTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    loginTime: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true,default: 0 },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    profile_picture: { type: String, default: 'default_profile.jpg' },
    googleId: { type: String, unique: true, sparse: true }, // Google ID field
    basic_info: { type: basicInfoSchema, required: false },
    fcmTokens: [fcmTokenSchema], // Array of FCM tokens and login times
    workout_routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    nutrition_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NutritionLog' }],
    progress_logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
    images_by_category: { type: Map, of: [imageSchema] } // Map of categories to array of images
}, { timestamps: true });

// Add a static method to your schema to find a user by email
userSchema.statics.findByEmail = async function(email) {
    const user = await this.findOne({ email });
    return user;
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
