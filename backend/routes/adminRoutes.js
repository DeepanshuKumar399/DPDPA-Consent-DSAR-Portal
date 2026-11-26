import express from 'express';
import { getRequests, updateRequest, getAuditLogs } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.use(protect, requireAdmin);
router.get('/requests', getRequests);
router.put('/requests/:id', updateRequest);
router.get('/audit-logs', getAuditLogs);

export default router;
