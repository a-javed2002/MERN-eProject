// models/TokenModel.js
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }
}, { timestamps: true });

const TokenModel = mongoose.model('Token', tokenSchema);

export default TokenModel;
