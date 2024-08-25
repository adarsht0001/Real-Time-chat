import express from 'express';
import controller from '../controller/index.js';

const router = express.Router();

router.post('/signup', controller.auth.createUser);

router.post('/login', controller.auth.loginUser);

export default router;
