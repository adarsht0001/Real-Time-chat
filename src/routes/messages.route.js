import express from 'express';
import controller from '../controller/index.js';
import jwtVerify from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post('/', jwtVerify, controller.message.createMessage);

router.get('/history', jwtVerify, controller.message.getMessageHistory);

export default router;
