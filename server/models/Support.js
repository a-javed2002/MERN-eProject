import mongoose from "mongoose";
const supportSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true }
});

const Support = mongoose.model('Support', supportSchema);

export default Support;
