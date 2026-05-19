import { Router } from 'express';
import {
  listUsers,
  updateUser,
  createOwner,
  listOwners,
  getPendingGrounds,
  reviewGroundListing,
  listAllBookings,
  resolveDispute,
  openDispute,
  getAnalytics,
  listAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/analytics', asyncHandler(getAnalytics));
router.get('/users', asyncHandler(listUsers));
router.patch('/users/:id', asyncHandler(updateUser));
router.post('/owners', asyncHandler(createOwner));
router.get('/owners', asyncHandler(listOwners));
router.get('/grounds/pending', asyncHandler(getPendingGrounds));
router.patch('/grounds/:id/listing', asyncHandler(reviewGroundListing));
router.get('/bookings', asyncHandler(listAllBookings));
router.post('/bookings/:id/dispute', asyncHandler(openDispute));
router.patch('/bookings/:id/dispute', asyncHandler(resolveDispute));
router.get('/amenities', asyncHandler(listAmenities));
router.post('/amenities', asyncHandler(createAmenity));
router.patch('/amenities/:id', asyncHandler(updateAmenity));
router.delete('/amenities/:id', asyncHandler(deleteAmenity));
router.get('/categories', asyncHandler(listCategories));
router.post('/categories', asyncHandler(createCategory));
router.patch('/categories/:id', asyncHandler(updateCategory));
router.delete('/categories/:id', asyncHandler(deleteCategory));

export default router;
