import { Router } from 'express';
import { logout, me, signin, signup } from '../controller/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.route('/signin').post(signin);
router.route('/signup').post(signup);
router.route('/logout').post(authMiddleware, logout);
router.route('/me').get(authMiddleware, me);

export default router;
