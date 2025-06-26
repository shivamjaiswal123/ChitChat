import { Router } from 'express';
import { getChattedUsers, getUsers } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(authMiddleware, getUsers);
router.route('/chatted-users').get(authMiddleware, getChattedUsers);

export default router;
