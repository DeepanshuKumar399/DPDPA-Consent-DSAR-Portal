import PrivacyRequest from '../models/PrivacyRequest.js';
import { logAudit } from './auditService.js';

export const createRequest = async (userId, data) => {
  const request = await PrivacyRequest.create({ user: userId, ...data });
  await logAudit(userId, 'REQUEST_CREATED', 'PrivacyRequest', request._id, data.type);
  return request;
};

export const getUserRequests = (userId) =>
  PrivacyRequest.find({ user: userId }).sort({ createdAt: -1 });

export const getAllRequests = () =>
  PrivacyRequest.find().populate('user', 'name email').sort({ createdAt: -1 });

export const updateRequestStatus = async (requestId, status, adminNote) => {
  return PrivacyRequest.findByIdAndUpdate(
    requestId,
    { status, adminNote },
    { new: true }
  );
};
