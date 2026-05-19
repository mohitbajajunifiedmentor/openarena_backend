import { Ground } from '../models/Ground.js';
import { Amenity } from '../models/Amenity.js';
import { Category } from '../models/Category.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

const populateListing = [
  { path: 'amenities', model: Amenity },
  { path: 'supportedSports', model: Category },
  { path: 'supportedEvents', model: Category },
  { path: 'owner', model: User, select: 'name email phone' },
];

function buildGroundFilter(query) {
  const filter = { listingStatus: 'approved', isActive: true };

  if (query.city) filter['location.city'] = new RegExp(query.city, 'i');
  if (query.minArea) filter.area = { ...filter.area, $gte: Number(query.minArea) };
  if (query.maxArea) filter.area = { ...filter.area, $lte: Number(query.maxArea) };
  if (query.minCapacity) filter.capacity = { $gte: Number(query.minCapacity) };
  if (query.maxPeople) filter.capacity = { $lte: Number(query.maxPeople) };
  if (query.sportsType) filter.supportedSports = query.sportsType;
  if (query.eventType) filter.supportedEvents = query.eventType;
  if (query.amenities) {
    const ids = Array.isArray(query.amenities) ? query.amenities : query.amenities.split(',');
    filter.amenities = { $all: ids };
  }
  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, 'i') },
      { 'location.address': new RegExp(query.search, 'i') },
    ];
  }
  if (query.groundType && query.groundType !== 'all') {
    const type = query.groundType;
    if (type === 'sports') {
      filter.groundType = { $in: ['sports', 'mixed'] };
    } else if (type === 'event') {
      filter.groundType = { $in: ['event', 'mixed'] };
    } else {
      filter.groundType = type;
    }
  }
  return filter;
}

export async function getLocationStats(req, res, next) {
  try {
    const { city, groundType } = req.query;
    const filter = buildGroundFilter({ city, groundType });

    const [byCity, total] = await Promise.all([
      Ground.aggregate([
        { $match: filter },
        { $group: { _id: { $toLower: '$location.city' }, city: { $first: '$location.city' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      Ground.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        total,
        cities: byCity.map((c) => ({ city: c.city, count: c.count })),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function browseGrounds(req, res, next) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 12);
    const filter = buildGroundFilter(req.query);

    const [grounds, total] = await Promise.all([
      Ground.find(filter)
        .populate(populateListing)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Ground.countDocuments(filter),
    ]);

    res.json({ success: true, data: { grounds, total, page, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

export async function getGroundById(req, res, next) {
  try {
    const ground = await Ground.findById(req.params.id).populate(populateListing);
    if (!ground) throw new ApiError(404, 'Ground not found');

    const isOwner = req.user && String(ground.owner?._id || ground.owner) === String(req.user._id);
    const isAdmin = req.user?.role === 'admin';
    if (ground.listingStatus !== 'approved' && !isOwner && !isAdmin) {
      throw new ApiError(404, 'Ground not found');
    }

    res.json({ success: true, data: ground });
  } catch (err) {
    next(err);
  }
}
