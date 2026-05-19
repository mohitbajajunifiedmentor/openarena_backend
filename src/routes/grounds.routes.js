import { Router } from 'express';
import { browseGrounds, getGroundById, getLocationStats } from '../controllers/ground.controller.js';
import {
  getGroundMonthAvailability,
  getGroundDayAvailability,
} from '../controllers/availability.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(browseGrounds));
router.get('/stats/locations', asyncHandler(getLocationStats));
router.get('/:id/availability/month', asyncHandler(getGroundMonthAvailability));
router.get('/:id/availability/day/:date', asyncHandler(getGroundDayAvailability));
router.get('/:id', asyncHandler(getGroundById));

export default router;
