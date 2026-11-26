import mongoose from 'mongoose';

const consentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purpose: { type: String, required: true },
  status: { type: String, enum: ['granted', 'revoked'], default: 'granted' },
  grantedAt: { type: Date, default: Date.now },
  revokedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Consent', consentSchema);
