import mongoose from 'mongoose';

const privacyRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['access', 'correction', 'erasure', 'portability', 'nomination'], required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'rejected'], default: 'pending' },
  adminNote: { type: String },
}, { timestamps: true });

export default mongoose.model('PrivacyRequest', privacyRequestSchema);
