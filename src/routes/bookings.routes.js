import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  validateBooking,
  lockSlot,
  respondToBooking,
  getManageBookings,
  getBookingStats,
} from '../controllers/booking.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

// Public validation endpoints
router.post('/validate', authenticate, authorize('user', 'owner', 'admin'), asyncHandler(validateBooking));
router.post('/lock', authenticate, authorize('user', 'owner', 'admin'), asyncHandler(lockSlot));

// Protected routes
router.use(authenticate);

// Booking management
router.post('/', authorize('user', 'owner', 'admin'), asyncHandler(createBooking));
router.get('/my', asyncHandler(getMyBookings));
router.get('/manage', authorize('owner', 'admin'), asyncHandler(getManageBookings));
router.get('/:id', asyncHandler(getBookingById));
router.patch('/:id/cancel', authorize('user', 'owner', 'admin'), asyncHandler(cancelBooking));
router.patch('/:id/respond', authorize('owner', 'admin'), asyncHandler(respondToBooking));

// Statistics
router.get('/stats/:groundId', authorize('owner', 'admin'), asyncHandler(getBookingStats));

export default router;
