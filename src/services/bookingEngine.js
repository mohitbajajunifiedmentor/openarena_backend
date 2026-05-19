import { Booking } from '../models/Booking.js';
import { SlotLock } from '../models/SlotLock.js';
import { Ground } from '../models/Ground.js';
import { ApiError } from '../utils/ApiError.js';
import {
  timeToMinutes,
  minutesToTime,
  rangesOverlap,
  normalizeDateOnly,
  dateKey,
  getDayName,
  isValidTimeRange,
} from '../utils/timeUtils.js';

const LOCK_MINUTES = Number(process.env.BOOKING_LOCK_MINUTES) || 10;
const ACTIVE_BOOKING_STATUSES = ['pending', 'approved'];

/**
 * Advanced Slot Conflict Detection Engine
 * Handles double booking prevention, time overlap detection, and race condition prevention
 */

export async function cleanupExpiredLocks() {
  try {
    const result = await SlotLock.updateMany(
      { status: 'active', expiresAt: { $lt: new Date() } },
      { $set: { status: 'expired' } }
    );
    return result;
  } catch (err) {
    console.error('Cleanup expired locks error:', err);
    throw err;
  }
}

function getScheduleForDate(ground, dateInput) {
  const day = getDayName(dateInput);
  const weekly = ground.weeklySchedule?.[day];
  if (weekly?.closed) return null;
  return {
    open: weekly?.open || ground.openingTime || '06:00',
    close: weekly?.close || ground.closingTime || '22:00',
  };
}

export function isDateBlocked(ground, dateInput) {
  const key = dateKey(dateInput);
  return ground.blockedDates?.some((bd) => dateKey(bd.date) === key);
}

function getDynamicPricing(ground, dateInput) {
  const d = normalizeDateOnly(dateInput);
  const match = ground.dynamicPricing?.find((p) => {
    const from = p.dateFrom ? normalizeDateOnly(p.dateFrom) : null;
    const to = p.dateTo ? normalizeDateOnly(p.dateTo) : null;
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });
  if (!match) return ground.pricing || {};
  const base = { ...ground.pricing?.toObject?.(), ...ground.pricing };
  const mult = match.multiplier || 1;
  return {
    hourly: (match.hourly ?? base.hourly) != null ? Math.round((match.hourly ?? base.hourly) * mult) : base.hourly,
    daily: (match.daily ?? base.daily) != null ? Math.round((match.daily ?? base.daily) * mult) : base.daily,
    halfDay: (match.halfDay ?? base.halfDay) != null ? Math.round((match.halfDay ?? base.halfDay) * mult) : base.halfDay,
    eventBased: (match.eventBased ?? base.eventBased) != null
      ? Math.round((match.eventBased ?? base.eventBased) * mult)
      : base.eventBased,
  };
}

export function resolveSlotTimes(ground, dateInput, slotType, customStart, customEnd) {
  const schedule = getScheduleForDate(ground, dateInput);
  if (!schedule) throw new ApiError(400, 'Ground is closed on this day');

  const openM = timeToMinutes(schedule.open);
  const closeM = timeToMinutes(schedule.close);
  const mid = Math.floor((openM + closeM) / 2);

  if (slotType === 'full_day') {
    return { startTime: schedule.open, endTime: schedule.close, startM: openM, endM: closeM };
  }
  if (slotType === 'half_day') {
    const half = customStart === 'afternoon' ? 'afternoon' : 'morning';
    if (half === 'afternoon') {
      return {
        startTime: minutesToTime(mid),
        endTime: schedule.close,
        startM: mid,
        endM: closeM,
      };
    }
    return {
      startTime: schedule.open,
      endTime: minutesToTime(mid),
      startM: openM,
      endM: mid,
    };
  }
  if (!customStart || !customEnd) throw new ApiError(400, 'Start and end time required for hourly booking');
  if (!isValidTimeRange(customStart, customEnd)) {
    throw new ApiError(400, 'End time must be after start time');
  }
  const startM = timeToMinutes(customStart);
  const endM = timeToMinutes(customEnd);
  if (startM < openM || endM > closeM) {
    throw new ApiError(400, `Booking must be within ${schedule.open} – ${schedule.close}`);
  }
  return { startTime: customStart, endTime: customEnd, startM, endM };
}

export function calculateTotalPrice(pricing, slotType, startM, endM) {
  const hours = (endM - startM) / 60;
  if (slotType === 'full_day' && pricing.daily) return pricing.daily;
  if (slotType === 'half_day' && pricing.halfDay) return pricing.halfDay;
  if (slotType === 'full_day' && pricing.hourly) return Math.round(pricing.hourly * hours);
  if (pricing.hourly) return Math.round(pricing.hourly * hours);
  if (pricing.eventBased) return pricing.eventBased;
  if (pricing.daily) return pricing.daily;
  return 0;
}

/**
 * Fetch all occupancy data for a specific day
 * Used for conflict detection and availability checking
 */
async function fetchDayOccupancy(groundId, dateInput, excludeBookingId = null) {
  const dayStart = normalizeDateOnly(dateInput);
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  const query = {
    ground: groundId,
    $or: [{ date: { $gte: dayStart, $lte: dayEnd } }, { bookingDate: { $gte: dayStart, $lte: dayEnd } }],
    status: { $in: ACTIVE_BOOKING_STATUSES },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const [bookings, locks] = await Promise.all([
    Booking.find(query).lean().select('startTime endTime status'),
    SlotLock.find({
      ground: groundId,
      date: { $gte: dayStart, $lte: dayEnd },
      status: 'active',
      expiresAt: { $gt: new Date() },
    })
      .lean()
      .select('user startTime endTime expiresAt'),
  ]);

  return { bookings, locks };
}

/**
 * Advanced Conflict Detection
 * Detects any overlapping time slots with existing bookings or locks
 */
export function findConflict(startM, endM, bookings, locks, excludeUserId = null) {
  // Check against confirmed bookings
  for (const b of bookings) {
    const bStart = timeToMinutes(b.startTime);
    const bEnd = timeToMinutes(b.endTime);
    if (rangesOverlap(startM, endM, bStart, bEnd)) {
      return {
        type: 'booking',
        ref: b,
        message: `Conflicts with existing booking from ${b.startTime}–${b.endTime}`,
        severity: 'critical',
      };
    }
  }

  // Check against temporary locks
  for (const l of locks) {
    if (excludeUserId && String(l.user) === String(excludeUserId)) continue;
    const lStart = timeToMinutes(l.startTime);
    const lEnd = timeToMinutes(l.endTime);
    if (rangesOverlap(startM, endM, lStart, lEnd)) {
      return {
        type: 'lock',
        ref: l,
        message: 'Slot is temporarily held by another user. Please try a different time.',
        severity: 'warning',
      };
    }
  }
  return null;
}

/**
 * Comprehensive slot validation
 * Performs all necessary checks before allowing a booking
 */
export async function validateSlot(groundId, payload, userId = null, excludeBookingId = null) {
  await cleanupExpiredLocks();
  
  const ground = await Ground.findById(groundId).lean();
  if (!ground || ground.listingStatus !== 'approved' || !ground.isActive) {
    throw new ApiError(404, 'Ground not available for booking');
  }

  const { date, slotType = 'hourly', startTime, endTime, numberOfPeople } = payload;
  if (!date) throw new ApiError(400, 'Date is required');

  // Check if date is blocked by owner
  if (isDateBlocked(ground, date)) {
    throw new ApiError(400, 'This date is blocked by the owner');
  }

  // Validate date is not in the past
  const bookingDate = normalizeDateOnly(date);
  const today = normalizeDateOnly(new Date());
  if (bookingDate < today) {
    throw new ApiError(400, 'Cannot book past dates');
  }

  // Resolve actual time range for the slot
  const { startTime: st, endTime: et, startM, endM } = resolveSlotTimes(
    ground,
    date,
    slotType,
    startTime,
    endTime
  );

  // Validate capacity
  if (numberOfPeople && numberOfPeople > ground.capacity) {
    throw new ApiError(400, `Capacity exceeded. Maximum capacity: ${ground.capacity} people`);
  }

  // Fetch day occupancy and check for conflicts
  const { bookings, locks } = await fetchDayOccupancy(groundId, date, excludeBookingId);
  const conflict = findConflict(startM, endM, bookings, locks, userId);
  if (conflict) {
    throw new ApiError(409, conflict.message);
  }

  // Calculate pricing
  const pricing = getDynamicPricing(ground, date);
  const totalPrice = calculateTotalPrice(pricing, slotType, startM, endM);

  return {
    ground,
    bookingDate,
    startTime: st,
    endTime: et,
    startM,
    endM,
    slotType,
    pricing,
    totalPrice,
    schedule: getScheduleForDate(ground, date),
    conflictCheckPassed: true,
  };
}

export function generateTimeSlots(ground, dateInput, bookings, locks) {
  const bookingDate = normalizeDateOnly(dateInput);
  const today = normalizeDateOnly(new Date());
  if (bookingDate < today) return [];

  const schedule = getScheduleForDate(ground, dateInput);
  if (!schedule || isDateBlocked(ground, dateInput)) return [];

  const interval = ground.slotDurationMinutes || 60;
  const openM = timeToMinutes(schedule.open);
  const closeM = timeToMinutes(schedule.close);
  const slots = [];
  const now = new Date();
  const isToday = dateKey(dateInput) === dateKey(now);
  const nowM = now.getHours() * 60 + now.getMinutes();

  for (let m = openM; m + interval <= closeM; m += interval) {
    const startTime = minutesToTime(m);
    const endTime = minutesToTime(m + interval);
    const startM = m;
    const endM = m + interval;

    let status = 'available';
    if (isToday && startM < nowM) status = 'past';

    const conflict = findConflict(startM, endM, bookings, locks);
    if (conflict) status = conflict.type === 'lock' ? 'locked' : 'booked';

    slots.push({ startTime, endTime, startM, endM, status });
  }
  return slots;
}

export function getDayStatus(slots) {
  if (!slots.length) return 'blocked';
  const bookable = slots.filter((s) => s.status === 'available' || s.status === 'locked');
  const available = slots.filter((s) => s.status === 'available');
  if (available.length === 0 && bookable.length === 0) return 'full';
  if (available.length === slots.filter((s) => s.status !== 'past').length) return 'available';
  if (available.length > 0) return 'partial';
  return 'full';
}

export async function getMonthAvailability(groundId, year, month) {
  await cleanupExpiredLocks();
  const ground = await Ground.findById(groundId);
  if (!ground) throw new ApiError(404, 'Ground not found');

  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month - 1, day);
    if (isDateBlocked(ground, d)) {
      calendar.push({ date: dateKey(d), status: 'blocked', availableSlots: 0, totalSlots: 0 });
      continue;
    }
    const schedule = getScheduleForDate(ground, d);
    if (!schedule) {
      calendar.push({ date: dateKey(d), status: 'blocked', availableSlots: 0, totalSlots: 0 });
      continue;
    }
    const { bookings, locks } = await fetchDayOccupancy(groundId, d);
    const slots = generateTimeSlots(ground, d, bookings, locks);
    const availableSlots = slots.filter((s) => s.status === 'available').length;
    calendar.push({
      date: dateKey(d),
      status: getDayStatus(slots),
      availableSlots,
      totalSlots: slots.filter((s) => s.status !== 'past').length,
      openingTime: schedule.open,
      closingTime: schedule.close,
    });
  }
  return { groundId, year, month, days: calendar, openingTime: ground.openingTime, closingTime: ground.closingTime };
}

export async function getDayAvailability(groundId, date) {
  await cleanupExpiredLocks();
  const ground = await Ground.findById(groundId);
  if (!ground) throw new ApiError(404, 'Ground not found');

  const key = dateKey(date);
  if (isDateBlocked(ground, date)) {
    return {
      date: key,
      status: 'blocked',
      slots: [],
      bookings: [],
      schedule: null,
    };
  }

  const schedule = getScheduleForDate(ground, date);
  if (!schedule) {
    return { date: key, status: 'blocked', slots: [], bookings: [], schedule: null };
  }

  const { bookings, locks } = await fetchDayOccupancy(groundId, date);
  const slots = generateTimeSlots(ground, date, bookings, locks);

  return {
    date: key,
    status: getDayStatus(slots),
    slots,
    schedule,
    bookings: bookings.map((b) => ({
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.status,
    })),
    pricing: getDynamicPricing(ground, date),
  };
}

export async function createSlotLock(groundId, userId, payload) {
  const validated = await validateSlot(groundId, payload, userId);
  const expiresAt = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);

  const lock = await SlotLock.create({
    ground: groundId,
    user: userId,
    bookingDate: validated.bookingDate,
    startTime: validated.startTime,
    endTime: validated.endTime,
    expiresAt,
  });

  return { lock, validated, expiresInSeconds: LOCK_MINUTES * 60 };
}

export async function createBookingFromLock(userId, body) {
  await cleanupExpiredLocks();
  const { groundId, lockId, bookingType, category, numberOfPeople, userNote, slotType } = body;

  let validated;
  let lock = null;

  if (lockId) {
    lock = await SlotLock.findOne({ _id: lockId, user: userId, status: 'active' });
    if (!lock || lock.expiresAt < new Date()) {
      throw new ApiError(410, 'Slot lock expired. Please select your slot again.');
    }
    validated = await validateSlot(
      lock.ground,
      {
        date: lock.bookingDate,
        slotType: slotType || 'hourly',
        startTime: lock.startTime,
        endTime: lock.endTime,
        numberOfPeople,
      },
      userId
    );
  } else {
    validated = await validateSlot(groundId, body, userId);
  }

  const booking = await Booking.create({
    ground: lock?.ground || groundId,
    user: userId,
    bookingType,
    slotType: validated.slotType,
    category,
    bookingDate: validated.bookingDate,
    date: validated.bookingDate,
    startTime: validated.startTime,
    endTime: validated.endTime,
    numberOfPeople,
    userNote,
    status: 'pending',
    totalPrice: validated.totalPrice,
    pricingSnapshot: { ...validated.pricing, estimatedTotal: validated.totalPrice },
    revenueType: bookingType,
    lockId: lock?._id,
  });

  if (lock) {
    lock.status = 'converted';
    await lock.save();
  }

  return booking;
}

export async function approveBooking(bookingId, approver, note) {
  await cleanupExpiredLocks();
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.status !== 'pending') throw new ApiError(400, 'Booking already processed');

  const validated = await validateSlot(
    booking.ground,
    {
      date: booking.bookingDate || booking.date,
      slotType: booking.slotType,
      startTime: booking.startTime,
      endTime: booking.endTime,
      numberOfPeople: booking.numberOfPeople,
    },
    null,
    booking._id
  );

  booking.status = 'approved';
  booking.approvedBy = { user: approver._id, role: approver.role };
  booking.approvedAt = new Date();
  booking.ownerNote = note;
  booking.totalPrice = validated.totalPrice;
  await booking.save();
  return booking;
}

/**
 * Get all bookings for a ground on a specific date
 * Useful for owner/admin dashboards
 */
export async function getGroundDayBookings(groundId, date) {
  const dayStart = normalizeDateOnly(date);
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    ground: groundId,
    $or: [{ date: { $gte: dayStart, $lte: dayEnd } }, { bookingDate: { $gte: dayStart, $lte: dayEnd } }],
    status: { $in: ACTIVE_BOOKING_STATUSES },
  })
    .populate('user', 'name email phone')
    .lean();

  return bookings;
}

/**
 * Check if a specific time range is available for booking
 * Returns true if available, false if conflicted
 */
export async function isTimeRangeAvailable(groundId, date, startTime, endTime) {
  try {
    const startM = timeToMinutes(startTime);
    const endM = timeToMinutes(endTime);

    const { bookings, locks } = await fetchDayOccupancy(groundId, date);
    const conflict = findConflict(startM, endM, bookings, locks);

    return !conflict;
  } catch (err) {
    return false;
  }
}

/**
 * Get revenue summary for owner
 */
export async function getOwnerRevenue(ownerId, startDate, endDate) {
  const grounds = await Ground.find({ owner: ownerId }).select('_id').lean();
  const groundIds = grounds.map((g) => g._id);

  const bookings = await Booking.find({
    ground: { $in: groundIds },
    status: 'approved',
    'approvedBy.approvedAt': { $gte: startDate, $lte: endDate },
  }).lean();

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalBookings = bookings.length;

  return { totalRevenue, totalBookings, bookings };
}

/**
 * Get booking statistics for a ground
 */
export async function getGroundBookingStats(groundId) {
  const [total, pending, approved, rejected, cancelled] = await Promise.all([
    Booking.countDocuments({ ground: groundId }),
    Booking.countDocuments({ ground: groundId, status: 'pending' }),
    Booking.countDocuments({ ground: groundId, status: 'approved' }),
    Booking.countDocuments({ ground: groundId, status: 'rejected' }),
    Booking.countDocuments({ ground: groundId, status: 'cancelled' }),
  ]);

  return { total, pending, approved, rejected, cancelled };
}

/**
 * Auto-approve/expire pending bookings based on configured policies
 */
export async function processExpiredLocks() {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const result = await SlotLock.updateMany(
    { status: 'active', createdAt: { $lt: thirtyMinutesAgo }, expiresAt: { $lt: new Date() } },
    { $set: { status: 'expired' } }
  );

  return result;
}

/**
 * Cancel a booking and free up the slot
 */
export async function cancelBooking(bookingId, cancelledBy, reason) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (!['pending', 'approved'].includes(booking.status)) {
    throw new ApiError(400, 'Booking cannot be cancelled');
  }

  booking.status = 'cancelled';
  booking.cancellationReason = reason;
  booking.cancelledBy = cancelledBy;
  booking.cancelledAt = new Date();

  await booking.save();
  return booking;
}
