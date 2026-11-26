import AuditLog from '../models/AuditLog.js';

export const logAudit = (userId, action, entity, entityId, details = '') =>
  AuditLog.create({ user: userId, action, entity, entityId, details });
