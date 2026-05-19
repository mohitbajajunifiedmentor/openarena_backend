import { Router } from 'express';
import authRoutes from './auth.routes.js';
import groundsRoutes from './grounds.routes.js';
import bookingsRoutes from './bookings.routes.js';
import ownerRoutes from './owner.routes.js';
import adminRoutes from './admin.routes.js';
import catalogRoutes from './catalog.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OpenArena API is running' });
});

router.use('/auth', authRoutes);
router.use('/grounds', groundsRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/owner', ownerRoutes);
router.use('/admin', adminRoutes);
router.use('/catalog', catalogRoutes);

export default router;
