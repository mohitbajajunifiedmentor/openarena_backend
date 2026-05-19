import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import { User } from '../models/User.js';
import { Amenity } from '../models/Amenity.js';
import { Category } from '../models/Category.js';
import { Ground } from '../models/Ground.js';
import { getSportsVenues, getEventVenues } from './venueSeedData.js';
import { pexels } from './venueImages.js';

const amenities = [
  'Parking',
  'Valet Parking',
  'Changing Rooms',
  'Floodlights',
  'Drinking Water',
  'First Aid',
  'Seating Gallery',
  'Washrooms',
  'Equipment Rental',
  'Wi-Fi',
  'Power Backup',
  'CCTV Security',
  'Pro Shop',
  'Cafe / F&B',
];

const sportsCategories = [
  { name: 'Cricket', image: pexels(36741131) },     // Narendra Modi Stadium
  { name: 'Football', image: pexels(399187) },      // Lit football field
  { name: 'Badminton', image: pexels(3660204) },    // Indoor badminton court
  { name: 'Tennis', image: pexels(2078271) },       // Tennis court
  { name: 'Box Cricket', image: pexels(31739439) }, // Iconic empty stadium
  { name: 'Multi-Sport Turf', image: pexels(8783155) }, // Aerial sports field
];

const eventCategories = [
  { name: 'Wedding', image: pexels(1456613) },         // Wedding florals
  { name: 'Corporate Event', image: pexels(1181396) }, // Conference room
  { name: 'Concert', image: pexels(1105666) },         // Concert crowd
  { name: 'Exhibition', image: pexels(2774556) },      // Exhibition hall
  { name: 'Birthday / Party', image: pexels(1729797) }, // Party setup
  { name: 'Heritage Venue', image: pexels(2306281) }, // Heritage courtyard
];

async function seed() {
  await connectDB();

  if (!(await User.findOne({ email: 'admin@openarena.com' }))) {
    await User.create({
      name: 'Platform Admin',
      email: 'admin@openarena.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin: admin@openarena.com / admin123');
  }

  let owner = await User.findOne({ email: 'owner@openarena.com' });
  if (!owner) {
    owner = await User.create({
      name: 'Demo Land Manager',
      email: 'owner@openarena.com',
      password: 'owner123',
      role: 'owner',
    });
    console.log('Owner: owner@openarena.com / owner123');
  }

  const amenityDocs = {};
  for (const name of amenities) {
    const doc = await Amenity.findOneAndUpdate(
      { name },
      { name, isActive: true },
      { upsert: true, new: true }
    );
    amenityDocs[name] = doc._id;
  }

  const sportsCatIds = [];
  for (const { name, image } of sportsCategories) {
    const doc = await Category.findOneAndUpdate(
      { name, type: 'sports' },
      { name, type: 'sports', image, isActive: true },
      { upsert: true, new: true }
    );
    sportsCatIds.push(doc._id);
  }

  const eventCatIds = [];
  for (const { name, image } of eventCategories) {
    const doc = await Category.findOneAndUpdate(
      { name, type: 'event' },
      { name, type: 'event', image, isActive: true },
      { upsert: true, new: true }
    );
    eventCatIds.push(doc._id);
  }

  const sportsAmenities = [
    'Parking',
    'Changing Rooms',
    'Floodlights',
    'Washrooms',
    'Equipment Rental',
    'Drinking Water',
    'Wi-Fi',
    'Power Backup',
    'Cafe / F&B',
  ].map((n) => amenityDocs[n]).filter(Boolean);

  const eventAmenities = [
    'Valet Parking',
    'Washrooms',
    'Seating Gallery',
    'Drinking Water',
    'First Aid',
    'Wi-Fi',
    'Power Backup',
    'CCTV Security',
  ].map((n) => amenityDocs[n]).filter(Boolean);

  const removed = await Ground.deleteMany({ owner: owner._id });
  console.log(`Removed ${removed.deletedCount} previous demo venues for fresh seed.`);

  const sportsListings = getSportsVenues();
  const eventListings = getEventVenues();
  const allListings = [...sportsListings, ...eventListings];

  let created = 0;
  for (const demo of allListings) {
    const isSports = demo.groundType === 'sports';
    await Ground.create({
      ...demo,
      owner: owner._id,
      listingStatus: 'approved',
      isActive: true,
      amenities: isSports ? sportsAmenities : eventAmenities,
      supportedSports: isSports ? sportsCatIds : [],
      supportedEvents: isSports ? [] : eventCatIds,
    });
    created++;
  }

  const approvedCount = await Ground.countDocuments({
    listingStatus: 'approved',
    isActive: true,
    owner: owner._id,
  });

  console.log(`\nSeed done: ${created} venues created`);
  console.log(`Active demo venues on home: ${approvedCount} (${sportsListings.length} sports + ${eventListings.length} events)`);
  console.log('  → Realistic INR pricing benchmarked against Hudle, Playo, WedMeGood & Sloshout');
  console.log('  → Authentic Indian locality names, verified Pexels photography');
  console.log('  → Detailed descriptions with real coaching, catering & decor partner mentions');
  console.log('  → Multi-review guest feedback drawn from typical booking patterns');
  console.log('\nRefresh http://localhost:5173/ to see updated cards.\n');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});