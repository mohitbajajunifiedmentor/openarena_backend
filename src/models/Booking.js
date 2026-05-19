import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    // Core booking information
    ground: { type: mongoose.Schema.Types.ObjectId, ref: 'Ground', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Booking details
    bookingType: { type: String, enum: ['sports', 'event'], required: true },
    slotType: { type: String, enum: ['hourly', 'half_day', 'full_day'], default: 'hourly' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    
    // Date & Time - using consistent field name
    date: { type: Date, required: true }, // Primary date field
    bookingDate: { type: Date }, // Kept for backward compatibility
    startTime: { type: String, required: true }, // HH:MM format
    endTime: { type: String, required: true }, // HH:MM format
    
    // Booking details
    numberOfPeople: { type: Number, required: true, min: 1 },
    description: { type: String, trim: true },
    
    // Status & Workflow
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled', 'expired', 'completed'],
      default: 'pending',
      index: true,
    },
    
    // Notes
    ownerNote: { type: String, trim: true },
    userNote: { type: String, trim: true },
    rejectionReason: { type: String, trim: true },
    
    // Pricing
    totalPrice: { type: Number, default: 0, min: 0 },
    pricingSnapshot: {
      hourlyRate: Number,
      dailyRate: Number,
      halfDayRate: Number,
      durationHours: Number,
      baseAmount: Number,
      discountAmount: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
      estimatedTotal: Number,
    },
    
    // Slot locking
    lockId: { type: mongoose.Schema.Types.ObjectId, ref: 'SlotLock' },
    lockedUntil: Date,
    
    // Approval workflow
    approvedBy: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['owner', 'admin', 'manager'] },
      approvedAt: Date,
    },
    
    // Additional metadata
    conflictCheck: {
      performedAt: Date,
      noConflicts: { type: Boolean, default: true },
    },
    
    // Payment & Cancellation
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    cancellationReason: { type: String, trim: true },
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cancelledAt: Date,
    
    // Dispute handling
    dispute: {
      isOpen: { type: Boolean, default: false },
      reason: String,
      raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      raisedAt: Date,
      adminNote: String,
      resolvedAt: Date,
    },
    
    // Revenue classification
    revenueType: { type: String, enum: ['sports', 'event'], required: true },
    
    // Ground owner reference for faster queries
    groundOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Optimize for common queries
bookingSchema.index({ ground: 1, date: 1, status: 1 });
bookingSchema.index({ ground: 1, date: 1, startTime: 1, endTime: 1, status: 1 });
bookingSchema.index({ user: 1, status: 1, date: -1 });
bookingSchema.index({ groundOwner: 1, status: 1, date: -1 });
bookingSchema.index({ status: 1, date: 1 });
bookingSchema.index({ ground: 1, 'approvedBy.user': 1 });
bookingSchema.index({ paymentStatus: 1, status: 1 });

export const Booking = mongoose.model('Booking', bookingSchema);
