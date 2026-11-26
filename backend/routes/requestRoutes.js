import express from 'express';
import { create, getMyRequests } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getMyRequests);
router.post('/', create);

export default router;
