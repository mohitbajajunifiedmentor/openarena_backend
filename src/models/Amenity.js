import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Amenity = mongoose.model('Amenity', amenitySchema);
