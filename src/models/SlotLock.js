import mongoose from 'mongoose';

const slotLockSchema = new mongoose.Schema(
  {
    ground: { type: mongoose.Schema.Types.ObjectId, ref: 'Ground', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingDate: { type: Date, required: true },
    date: { type: Date, required: true }, // Normalized date (00:00:00)
    startTime: { type: String, required: true }, // HH:MM
    endTime: { type: String, required: true }, // HH:MM
    slotType: { type: String, enum: ['hourly', 'half_day', 'full_day'], default: 'hourly' },
    expiresAt: { type: Date, required: true, index: true }, // TTL index
    status: {
      type: String,
      enum: ['active', 'converted', 'expired', 'released'],
      default: 'active',
      index: true,
    },
    totalPrice: Number,
    numberOfPeople: Number,
    lockToken: { type: String, unique: true, sparse: true }, // For validation
  },
  { timestamps: true }
);

// TTL index - auto-delete expired locks after 15 minutes
slotLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound index for conflict checking
slotLockSchema.index({ ground: 1, date: 1, status: 1 });
slotLockSchema.index({ ground: 1, date: 1, startTime: 1, endTime: 1, status: 1 });

// User lookups
slotLockSchema.index({ user: 1, status: 1 });

export const SlotLock = mongoose.model('SlotLock', slotLockSchema);
