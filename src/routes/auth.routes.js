import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/me', authenticate, asyncHandler(getMe));
router.patch('/me', authenticate, asyncHandler(updateProfile));

export default router;
