import { Router } from 'express';
import { getUsers } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(authMiddleware, getUsers);

export default router;
