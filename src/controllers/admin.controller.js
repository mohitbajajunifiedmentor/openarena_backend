import { User } from '../models/User.js';
import { Ground } from '../models/Ground.js';
import { Booking } from '../models/Booking.js';
import { Amenity } from '../models/Amenity.js';
import { Category } from '../models/Category.js';
import { ApiError } from '../utils/ApiError.js';

export async function listUsers(req, res, next) {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { isActive, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, 'User not found');

    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (role && ['user', 'owner', 'admin'].includes(role)) user.role = role;
    await user.save();

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function createOwner(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, 'Name, email, and password are required');
    }
    const exists = await User.findOne({ email });
    if (exists) throw new ApiError(409, 'Email already registered');

    const owner = await User.create({ name, email, password, phone, role: 'owner' });
    res.status(201).json({
      success: true,
      data: { id: owner._id, name: owner.name, email: owner.email, phone: owner.phone, role: owner.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function listOwners(req, res, next) {
  try {
    const owners = await User.find({ role: 'owner' }).select('-password');
    const withCounts = await Promise.all(
      owners.map(async (owner) => {
        const groundCount = await Ground.countDocuments({ owner: owner._id });
        return { ...owner.toObject(), groundCount };
      })
    );
    res.json({ success: true, data: withCounts });
  } catch (err) {
    next(err);
  }
}

export async function getPendingGrounds(req, res, next) {
  try {
    const grounds = await Ground.find({ listingStatus: 'pending' })
      .populate('owner', 'name email phone')
      .populate('amenities supportedSports supportedEvents');
    res.json({ success: true, data: grounds });
  } catch (err) {
    next(err);
  }
}

export async function reviewGroundListing(req, res, next) {
  try {
    const { listingStatus, rejectionReason } = req.body;
    if (!['approved', 'rejected'].includes(listingStatus)) {
      throw new ApiError(400, 'listingStatus must be approved or rejected');
    }

    const ground = await Ground.findById(req.params.id);
    if (!ground) throw new ApiError(404, 'Ground not found');

    ground.listingStatus = listingStatus;
    ground.rejectionReason = listingStatus === 'rejected' ? rejectionReason : undefined;
    await ground.save();

    res.json({ success: true, data: ground });
  } catch (err) {
    next(err);
  }
}

export async function listAllBookings(req, res, next) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.dispute === 'true') filter['dispute.isOpen'] = true;
    if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;

    let query = Booking.find(filter)
      .populate('ground', 'name location capacity area')
      .populate('user', 'name email phone')
      .populate('groundOwner', 'name email');

    if (req.query.sortBy === 'date') {
      query = query.sort({ date: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const bookings = await query.lean();

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
 * Admin approve/reject booking
 */
export async function adminRespondToBooking(req, res, next) {
  try {
    const { status, adminNote } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      throw new ApiError(400, 'Status must be approved or rejected');
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');
    if (booking.status !== 'pending') throw new ApiError(400, 'Booking already processed');

    if (status === 'approved') {
      booking.status = 'approved';
      booking.approvedBy = { user: req.user._id, role: req.user.role };
      booking.approvedAt = new Date();
    } else {
      booking.status = 'rejected';
      booking.rejectionReason = adminNote;
    }

    booking.ownerNote = adminNote;
    await booking.save();

    await booking.populate([
      { path: 'ground', select: 'name' },
      { path: 'user', select: 'name email' },
    ]);

    res.json({
      success: true,
      data: booking,
      message: `Booking ${status} by admin`,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get detailed booking statistics
 */
export async function getDetailedBookingStats(req, res, next) {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const [byStatus, byType, byPayment] = await Promise.all([
      Booking.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Booking.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$bookingType', count: { $sum: 1 } } },
      ]),
      Booking.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$paymentStatus', count: { $sum: 1 } } },
      ]),
    ]);

    const totalRevenue = await Booking.aggregate([
      { $match: { ...dateFilter, status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      success: true,
      data: {
        byStatus,
        byType,
        byPayment,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function resolveDispute(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');

    booking.dispute = {
      isOpen: false,
      reason: booking.dispute?.reason,
      adminNote: req.body.adminNote,
      resolvedAt: new Date(),
    };
    if (req.body.status) booking.status = req.body.status;
    await booking.save();

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

export async function openDispute(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');

    booking.dispute = { isOpen: true, reason: req.body.reason };
    await booking.save();
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

export async function getAnalytics(req, res, next) {
  try {
    const [userCount, ownerCount, groundCount, bookingCount, approvedBookings] =
      await Promise.all([
        User.countDocuments({ role: 'user' }),
        User.countDocuments({ role: 'owner' }),
        Ground.countDocuments({ listingStatus: 'approved' }),
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'approved' }),
      ]);

    const conversionRate =
      bookingCount > 0 ? ((approvedBookings / bookingCount) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        registeredUsers: userCount,
        landOwners: ownerCount,
        approvedGrounds: groundCount,
        totalBookings: bookingCount,
        bookingConversionRate: `${conversionRate}%`,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function listAmenities(req, res, next) {
  try {
    const amenities = await Amenity.find().sort({ name: 1 });
    res.json({ success: true, data: amenities });
  } catch (err) {
    next(err);
  }
}

export async function createAmenity(req, res, next) {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json({ success: true, data: amenity });
  } catch (err) {
    next(err);
  }
}

export async function updateAmenity(req, res, next) {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!amenity) throw new ApiError(404, 'Amenity not found');
    res.json({ success: true, data: amenity });
  } catch (err) {
    next(err);
  }
}

export async function deleteAmenity(req, res, next) {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) throw new ApiError(404, 'Amenity not found');
    res.json({ success: true, message: 'Amenity deleted' });
  } catch (err) {
    next(err);
  }
}

export async function listCategories(req, res, next) {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req, res, next) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) throw new ApiError(404, 'Category not found');
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw new ApiError(404, 'Category not found');
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}
