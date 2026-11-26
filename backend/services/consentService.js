import Consent from '../models/Consent.js';
import { logAudit } from './auditService.js';

export const grantConsent = async (userId, purpose) => {
  const consent = await Consent.create({ user: userId, purpose });
  await logAudit(userId, 'CONSENT_GRANTED', 'Consent', consent._id, purpose);
  return consent;
};

export const revokeConsent = async (consentId, userId) => {
  const consent = await Consent.findOneAndUpdate(
    { _id: consentId, user: userId },
    { status: 'revoked', revokedAt: new Date() },
    { new: true }
  );
  if (!consent) throw new Error('Consent not found');
  await logAudit(userId, 'CONSENT_REVOKED', 'Consent', consent._id);
  return consent;
};

export const getUserConsents = (userId) =>
  Consent.find({ user: userId }).sort({ createdAt: -1 });
