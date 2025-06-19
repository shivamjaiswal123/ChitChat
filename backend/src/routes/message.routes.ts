import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getMessages } from '../controller/message.controller';

const router = Router();

router.route('/').get(authMiddleware, getMessages);

export default router;
