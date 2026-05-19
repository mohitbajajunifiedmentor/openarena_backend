import { Router } from 'express';
import {
  getDashboard,
  getMyGrounds,
  createGround,
  updateGround,
  deleteGround,
  setGroundActive,
  setPricing,
  blockDate,
  unblockDate,
  getOwnerBookings,
  setGroundSchedule,
} from '../controllers/owner.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate, authorize('owner', 'admin'));

router.get('/dashboard', asyncHandler(getDashboard));
router.get('/grounds', asyncHandler(getMyGrounds));
router.post('/grounds', asyncHandler(createGround));
router.put('/grounds/:id', asyncHandler(updateGround));
router.delete('/grounds/:id', asyncHandler(deleteGround));
router.patch('/grounds/:id/active', asyncHandler(setGroundActive));
router.patch('/grounds/:id/pricing', asyncHandler(setPricing));
router.post('/grounds/:id/blocked-dates', asyncHandler(blockDate));
router.delete('/grounds/:id/blocked-dates/:blockId', asyncHandler(unblockDate));
router.get('/bookings', asyncHandler(getOwnerBookings));
router.patch('/grounds/:id/schedule', asyncHandler(setGroundSchedule));

export default router;
