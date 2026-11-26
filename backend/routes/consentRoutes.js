import express from 'express';
import { grant, revoke, getConsents } from '../controllers/consentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getConsents);
router.post('/', grant);
router.put('/:id/revoke', revoke);

export default router;
