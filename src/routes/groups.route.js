import express from 'express';
import controller from '../controller/index.js';
import jwtVerify from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post('/', jwtVerify, controller.group.createGroup);

export default router;
