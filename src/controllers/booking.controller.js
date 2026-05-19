import { Booking } from '../models/Booking.js';
import { Ground } from '../models/Ground.js';
import { ApiError } from '../utils/ApiError.js';
import {
  validateSlot,
  createSlotLock,
  createBookingFromLock,
  approveBooking,
  cancelBooking as cancelBookingService,
  getGroundDayBookings,
  getGroundBookingStats,
} from '../services/bookingEngine.js';

/**
 * Validate if a slot is available before locking
 */
export async function validateBooking(req, res, next) {
  try {
    const data = await validateSlot(req.body.groundId, req.body, req.user._id);
    res.json({
      success: true,
      data: {
        available: true,
        startTime: data.startTime,
        endTime: data.endTime,
        totalPrice: data.totalPrice,
        schedule: data.schedule,
        duration: data.endM - data.startM,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Lock a slot for 10 minutes before booking confirmation
 * Prevents double booking during checkout
 */
export async function lockSlot(req, res, next) {
  try {
    const { lock, validated, expiresInSeconds } = await createSlotLock(
      req.body.groundId,
      req.user._id,
      req.body
    );
    res.status(201).json({
      success: true,
      data: {
        lockId: lock._id,
        expiresAt: lock.expiresAt,
        expiresInSeconds,
        startTime: validated.startTime,
        endTime: validated.endTime,
        totalPrice: validated.totalPrice,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Create a booking from a slot lock
 * User must provide booking details (type, category, number of people, etc.)
 */
export async function createBooking(req, res, next) {
  try {
    const booking = await createBookingFromLock(req.user._id, {
      ...req.body,
      groundId: req.body.groundId,
    });

    const ground = await Ground.findById(booking.ground).select('name location owner');
    
    // Store ground owner reference for faster queries
    booking.groundOwner = ground.owner;
    await booking.save();

    await booking.populate([
      { path: 'ground', select: 'name location pricing area capacity areaUnit' },
      { path: 'category', select: 'name type' },
    ]);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking request created. Awaiting owner/admin approval.',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get all bookings of the authenticated user
 */
export async function getMyBookings(req, res, next) {
  try {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const bookings = await Booking.find(filter)
      .populate('ground', 'name location photos pricing area capacity areaUnit')
      .populate('category', 'name type')
      .sort({ date: -1 })
      .lean();

    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get a specific booking (with permission checks)
 */
export async function getBookingById(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('ground')
      .populate('category', 'name type')
      .populate('user', 'name email phone');

    if (!booking) throw new ApiError(404, 'Booking not found');

    const ground = await Ground.findById(booking.ground._id || booking.ground);
    const isUser = String(booking.user._id) === String(req.user._id);
    const isOwner = ground && String(ground.owner) === String(req.user._id);
    const isAdmin = req.user.role === 'admin' || req.user.role === 'manager';

    if (!isUser && !isOwner && !isAdmin) {
      throw new ApiError(403, 'Access denied');
    }

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

/**
 * Cancel a booking (user can only cancel their own)
 */
export async function cancelBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');

    if (String(booking.user) !== String(req.user._id)) {
      throw new ApiError(403, 'Only the booking user can cancel');
    }

    if (!['pending', 'approved'].includes(booking.status)) {
      throw new ApiError(400, 'Booking cannot be cancelled at this stage');
    }

    const updated = await cancelBookingService(
      booking._id,
      req.user._id,
      req.body.reason || 'User requested cancellation'
    );

    res.json({
      success: true,
      data: updated,
      message: 'Booking cancelled successfully',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Owner or admin/manager respond to a booking (approve/reject)
 */
export async function respondToBooking(req, res, next) {
  try {
    const { status, ownerNote } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      throw new ApiError(400, 'Status must be approved or rejected');
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');
    if (booking.status !== 'pending') {
      throw new ApiError(400, 'Booking already processed');
    }

    const ground = await Ground.findById(booking.ground);
    const isOwner = ground && String(ground.owner) === String(req.user._id);
    const isAdmin = req.user.role === 'admin' || req.user.role === 'manager';

    if (!isOwner && !isAdmin) {
      throw new ApiError(403, 'Only owner or admin/manager can respond to bookings');
    }

    if (status === 'approved') {
      const updated = await approveBooking(booking._id, req.user, ownerNote);
      return res.json({
        success: true,
        data: updated,
        message: 'Booking approved successfully',
      });
    }

    booking.status = 'rejected';
    booking.ownerNote = ownerNote;
    booking.approvedBy = { user: req.user._id, role: req.user.role };
    booking.approvedAt = new Date();
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Booking rejected',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get all bookings for owner/admin to manage
 */
export async function getManageBookings(req, res, next) {
  try {
    let filter = {};

    if (req.user.role === 'owner') {
      const grounds = await Ground.find({ owner: req.user._id }).select('_id');
      filter.ground = { $in: grounds.map((g) => g._id) };
    }

    if (req.query.status) filter.status = req.query.status;
    if (req.query.date) {
      const date = new Date(req.query.date);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      filter.date = { $gte: dayStart, $lte: dayEnd };
    }

    const bookings = await Booking.find(filter)
      .populate('ground', 'name location')
      .populate('user', 'name email phone')
      .populate('category', 'name type')
      .sort({ date: -1, startTime: 1 })
      .lean();

    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get booking statistics for a ground
 */
export async function getBookingStats(req, res, next) {
  try {
    const { groundId } = req.params;
    const ground = await Ground.findById(groundId);
    if (!ground) throw new ApiError(404, 'Ground not found');

    const isOwner = String(ground.owner) === String(req.user._id);
    const isAdmin = req.user.role === 'admin' || req.user.role === 'manager';

    if (!isOwner && !isAdmin) {
      throw new ApiError(403, 'Access denied');
    }

    const stats = await getGroundBookingStats(groundId);

    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
}
