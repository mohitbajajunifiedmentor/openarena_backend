import { Router } from 'express';
import { getActiveAmenities, getActiveCategories } from '../controllers/catalog.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/amenities', asyncHandler(getActiveAmenities));
router.get('/categories', asyncHandler(getActiveCategories));

export default router;
