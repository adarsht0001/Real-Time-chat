import express from 'express';
import authRoutes from './auth.route.js';
import messageRoutes from './messages.route.js';
import groupRoutes from './groups.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);
router.use('/groups', groupRoutes);

export default router;
