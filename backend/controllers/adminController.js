import { getAllRequests, updateRequestStatus } from '../services/requestService.js';
import AuditLog from '../models/AuditLog.js';
import { logAudit } from '../services/auditService.js';

export const getRequests = async (req, res) => {
  const requests = await getAllRequests();
  res.json(requests);
};

export const updateRequest = async (req, res) => {
  const { status, adminNote } = req.body;
  const request = await updateRequestStatus(req.params.id, status, adminNote);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  await logAudit(req.user._id, 'REQUEST_UPDATED', 'PrivacyRequest', request._id, status);
  res.json(request);
};

export const getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(200);
  res.json(logs);
};
