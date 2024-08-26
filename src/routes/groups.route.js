import express from 'express';
import controller from '../controller/index.js';
import jwtVerify from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post('/', jwtVerify, controller.group.createGroup);
router.post('/:id/messages', jwtVerify, controller.group.sendGroupMessage);


export default router;
