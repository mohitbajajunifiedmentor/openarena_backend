import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema(
  {
    hourly: { type: Number, min: 0 },
    daily: { type: Number, min: 0 },
    halfDay: { type: Number, min: 0 },
    eventBased: { type: Number, min: 0 },
  },
  { _id: false }
);

const dayScheduleSchema = new mongoose.Schema(
  {
    open: { type: String, default: '06:00' },
    close: { type: String, default: '22:00' },
    closed: { type: Boolean, default: false },
  },
  { _id: false }
);

const dynamicPricingSchema = new mongoose.Schema(
  {
    label: String,
    dateFrom: Date,
    dateTo: Date,
    hourly: Number,
    daily: Number,
    halfDay: Number,
    multiplier: { type: Number, default: 1 },
  },
  { _id: true }
);

const blockedDateSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    reason: { type: String, trim: true },
  },
  { _id: true }
);

const eventDetailsSchema = new mongoose.Schema(
  {
    seatedCapacity: { type: Number, min: 0 },
    standingCapacity: { type: Number, min: 0 },
    minGuests: { type: Number, min: 0 },
    rooms: { type: Number, min: 0 },
    washrooms: { type: Number, min: 0 },
    dressingRooms: { type: Number, min: 0 },
    parkingSpaces: { type: Number, min: 0 },
    cateringAvailable: { type: Boolean, default: false },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    visitType: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const sportsDetailsSchema = new mongoose.Schema(
  {
    surfaceType: { type: String, trim: true },
    sportsAllowed: { type: String, trim: true },
    peakHoursStart: { type: String, trim: true },
    peakHoursEnd: { type: String, trim: true },
    advanceBookingDays: { type: Number, min: 0 },
    equipmentIncluded: { type: String, trim: true },
  },
  { _id: false }
);

const groundSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    groundType: { type: String, enum: ['sports', 'event', 'mixed'], default: 'mixed' },
    eventDetails: { type: eventDetailsSchema, default: () => ({}) },
    sportsDetails: { type: sportsDetailsSchema, default: () => ({}) },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
      coordinates: { lat: Number, lng: Number },
    },
    area: { type: Number, required: true, min: 0 },
    areaUnit: { type: String, enum: ['sqft', 'acres'], default: 'sqft' },
    boundarySize: { type: String, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    supportedSports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    supportedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    photos: [{ type: String }],
    reviews: [reviewSchema],
    ratingAverage: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    rules: { type: String },
    pricing: { type: pricingSchema, default: () => ({}) },
    dynamicPricing: [dynamicPricingSchema],
    openingTime: { type: String, default: '06:00' },
    closingTime: { type: String, default: '22:00' },
    slotDurationMinutes: { type: Number, default: 60, min: 15, max: 240 },
    weeklySchedule: {
      monday: { type: dayScheduleSchema, default: () => ({}) },
      tuesday: { type: dayScheduleSchema, default: () => ({}) },
      wednesday: { type: dayScheduleSchema, default: () => ({}) },
      thursday: { type: dayScheduleSchema, default: () => ({}) },
      friday: { type: dayScheduleSchema, default: () => ({}) },
      saturday: { type: dayScheduleSchema, default: () => ({}) },
      sunday: { type: dayScheduleSchema, default: () => ({}) },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listingStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: { type: String },
    blockedDates: [blockedDateSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

groundSchema.index({ 'location.city': 1, listingStatus: 1 });
groundSchema.index({ area: 1, capacity: 1 });

export const Ground = mongoose.model('Ground', groundSchema);
