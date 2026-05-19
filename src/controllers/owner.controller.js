import { Ground } from '../models/Ground.js';
import { Booking } from '../models/Booking.js';
import { ApiError } from '../utils/ApiError.js';

async function getOwnerGround(id, ownerId) {
  const ground = await Ground.findOne({ _id: id, owner: ownerId });
  if (!ground) throw new ApiError(404, 'Ground not found');
  return ground;
}

export async function getDashboard(req, res, next) {
  try {
    const grounds = await Ground.find({ owner: req.user._id }).select('_id');
    const groundIds = grounds.map((g) => g._id);

    const [totalGrounds, pendingListings, bookings] = await Promise.all([
      Ground.countDocuments({ owner: req.user._id }),
      Ground.countDocuments({ owner: req.user._id, listingStatus: 'pending' }),
      Booking.find({ ground: { $in: groundIds } }),
    ]);

    const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
    const sportsRevenue = bookings
      .filter((b) => b.status === 'approved' && b.revenueType === 'sports')
      .reduce((sum, b) => sum + (b.pricingSnapshot?.estimatedTotal || 0), 0);
    const eventRevenue = bookings
      .filter((b) => b.status === 'approved' && b.revenueType === 'event')
      .reduce((sum, b) => sum + (b.pricingSnapshot?.estimatedTotal || 0), 0);

    res.json({
      success: true,
      data: {
        totalGrounds,
        pendingListings,
        pendingBookings,
        totalBookings: bookings.length,
        revenue: { sports: sportsRevenue, event: eventRevenue, total: sportsRevenue + eventRevenue },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMyGrounds(req, res, next) {
  try {
    const grounds = await Ground.find({ owner: req.user._id })
      .populate('amenities supportedSports supportedEvents')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: grounds });
  } catch (err) {
    next(err);
  }
}

export async function createGround(req, res, next) {
  try {
    const ground = await Ground.create({ ...req.body, owner: req.user._id, listingStatus: 'pending' });
    await ground.populate('amenities supportedSports supportedEvents');
    res.status(201).json({ success: true, data: ground });
  } catch (err) {
    next(err);
  }
}

export async function updateGround(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    Object.assign(ground, req.body);
    ground.listingStatus = 'pending';
    await ground.save();
    await ground.populate('amenities supportedSports supportedEvents');
    res.json({ success: true, data: ground });
  } catch (err) {
    next(err);
  }
}

export async function deleteGround(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    ground.isActive = false;
    await ground.save();
    res.json({ success: true, message: 'Ground deactivated' });
  } catch (err) {
    next(err);
  }
}

export async function setGroundActive(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    if (typeof req.body.isActive !== 'boolean') {
      throw new ApiError(400, 'isActive (boolean) is required');
    }
    ground.isActive = req.body.isActive;
    await ground.save();
    res.json({ success: true, data: { _id: ground._id, isActive: ground.isActive } });
  } catch (err) {
    next(err);
  }
}

export async function setPricing(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    ground.pricing = { ...ground.pricing?.toObject?.(), ...req.body };
    await ground.save();
    res.json({ success: true, data: ground.pricing });
  } catch (err) {
    next(err);
  }
}

export async function blockDate(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    const { date, reason } = req.body;
    if (!date) throw new ApiError(400, 'Date is required');

    const exists = ground.blockedDates.some(
      (bd) => new Date(bd.date).toDateString() === new Date(date).toDateString()
    );
    if (exists) throw new ApiError(409, 'Date already blocked');

    ground.blockedDates.push({ date, reason });
    await ground.save();
    res.status(201).json({ success: true, data: ground.blockedDates });
  } catch (err) {
    next(err);
  }
}

export async function unblockDate(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    ground.blockedDates = ground.blockedDates.filter((bd) => String(bd._id) !== req.params.blockId);
    await ground.save();
    res.json({ success: true, data: ground.blockedDates });
  } catch (err) {
    next(err);
  }
}

export async function getOwnerBookings(req, res, next) {
  try {
    const grounds = await Ground.find({ owner: req.user._id }).select('_id');
    const filter = { ground: { $in: grounds.map((g) => g._id) } };
    if (req.query.status) filter.status = req.query.status;

    const bookings = await Booking.find(filter)
      .populate('ground', 'name')
      .populate('user', 'name email phone')
      .populate('category', 'name type')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
}

export async function setGroundSchedule(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    const { openingTime, closingTime, slotDurationMinutes, weeklySchedule, dynamicPricing } = req.body;
    
    if (openingTime) ground.openingTime = openingTime;
    if (closingTime) ground.closingTime = closingTime;
    if (slotDurationMinutes) {
      if (slotDurationMinutes < 15 || slotDurationMinutes > 240) {
        throw new ApiError(400, 'Slot duration must be between 15 and 240 minutes');
      }
      ground.slotDurationMinutes = slotDurationMinutes;
    }
    
    if (weeklySchedule) {
      ground.weeklySchedule = { ...ground.weeklySchedule?.toObject?.(), ...weeklySchedule };
    }
    
    if (dynamicPricing) {
      ground.dynamicPricing = dynamicPricing;
    }
    
    await ground.save();
    res.json({
      success: true,
      data: ground,
      message: 'Ground schedule updated successfully',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Set dynamic pricing for specific date ranges
 */
export async function setDynamicPricing(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    const { label, dateFrom, dateTo, hourly, daily, halfDay, multiplier } = req.body;

    if (!label || !dateFrom || !dateTo) {
      throw new ApiError(400, 'Label and date range are required');
    }

    // Validate dates
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    if (from > to) {
      throw new ApiError(400, 'Start date must be before end date');
    }

    const pricingEntry = {
      label,
      dateFrom: from,
      dateTo: to,
      hourly: hourly || ground.pricing?.hourly,
      daily: daily || ground.pricing?.daily,
      halfDay: halfDay || ground.pricing?.halfDay,
      multiplier: multiplier || 1,
    };

    if (!ground.dynamicPricing) {
      ground.dynamicPricing = [];
    }
    ground.dynamicPricing.push(pricingEntry);
    await ground.save();

    res.status(201).json({
      success: true,
      data: ground.dynamicPricing,
      message: 'Dynamic pricing added successfully',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Remove dynamic pricing
 */
export async function removeDynamicPricing(req, res, next) {
  try {
    const ground = await getOwnerGround(req.params.id, req.user._id);
    const { pricingId } = req.params;

    ground.dynamicPricing = ground.dynamicPricing.filter((p) => String(p._id) !== pricingId);
    await ground.save();

    res.json({
      success: true,
      data: ground.dynamicPricing,
      message: 'Dynamic pricing removed',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get revenue analytics for owner
 */
export async function getRevenueAnalytics(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    const grounds = await Ground.find({ owner: req.user._id }).select('_id');
    const groundIds = grounds.map((g) => g._id);

    let filter = {
      ground: { $in: groundIds },
      status: 'approved',
    };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bookings = await Booking.find(filter).lean();

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const sportsRevenue = bookings
      .filter((b) => b.revenueType === 'sports')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const eventRevenue = bookings
      .filter((b) => b.revenueType === 'event')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const bookingsByStatus = {};
    bookings.forEach((b) => {
      bookingsByStatus[b.status] = (bookingsByStatus[b.status] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalRevenue,
        sportsRevenue,
        eventRevenue,
        totalBookings: bookings.length,
        bookingsByStatus,
        period: { startDate, endDate },
      },
    });
  } catch (err) {
    next(err);
  }
}
