import express from 'express';
import authRoutes from './auth.route.js';
import messageRoutes from './messages.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);

export default router;
