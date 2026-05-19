import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['sports', 'event'], required: true },
    description: { type: String, trim: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, type: 1 }, { unique: true });

export const Category = mongoose.model('Category', categorySchema);
