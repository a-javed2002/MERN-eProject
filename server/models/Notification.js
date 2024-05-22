import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
