import { Amenity } from '../models/Amenity.js';
import { Category } from '../models/Category.js';

export async function getActiveAmenities(req, res, next) {
  try {
    const amenities = await Amenity.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: amenities });
  } catch (err) {
    next(err);
  }
}

export async function getActiveCategories(req, res, next) {
  try {
    const filter = { isActive: true };
    if (req.query.type) filter.type = req.query.type;
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}
