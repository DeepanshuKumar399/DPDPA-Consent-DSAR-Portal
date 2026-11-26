import { grantConsent, revokeConsent, getUserConsents } from '../services/consentService.js';

export const grant = async (req, res) => {
  const consent = await grantConsent(req.user._id, req.body.purpose);
  res.status(201).json(consent);
};

export const revoke = async (req, res) => {
  const consent = await revokeConsent(req.params.id, req.user._id);
  res.json(consent);
};

export const getConsents = async (req, res) => {
  const consents = await getUserConsents(req.user._id);
  res.json(consents);
};
