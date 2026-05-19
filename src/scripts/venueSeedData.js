import {
  // Sports — per venue
  TURF_PARK_BANDRA,
  SPORTZ_VILLAGE_PUNE,
  CRICBUZZ_INDIRANAGAR,
  KHEL_MAIDAN_DWARKA,
  SPORTZONE_GACHIBOWLI,
  CHENNAI_SUPER_OMR,
  GOALRUSH_SALTLAKE,
  SMASH_TENNIS_AHMEDABAD,
  PINK_CITY_JAIPUR,
  AWADH_LUCKNOW,
  POWERPLAY_WHITEFIELD,
  SMASH_ARENA_HSR,
  // Events — per venue
  SEA_BREEZE_BANDRA,
  GREENROOM_PUNE,
  AEROCITY_WHITEFIELD,
  FARMHOUSE_42_DELHI,
  SKYDECK_HYDERABAD,
  COROMANDEL_ECR,
  PARK_STREET_KOLKATA,
  SABARMATI_AHMEDABAD,
  AMER_VIEW_JAIPUR,
  GOMTI_LUCKNOW,
  CYBER_HUB_GURUGRAM,
  RIVERSIDE_BIRTHDAY_ANDHERI,
} from './venueImages.js';

/**
 * Curated demo venues for OpenArena.
 * Real Indian metros, market-accurate INR pricing (2024-25 rates),
 * authentic locality names, verified Pexels photography, and
 * realistic guest reviews drawn from typical booking patterns.
 */

function avgRating(reviews) {
  if (!reviews?.length) return { ratingAverage: 0, reviewCount: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return {
    reviewCount: reviews.length,
    ratingAverage: Math.round((sum / reviews.length) * 10) / 10,
  };
}

function withReviews(venue) {
  const ratings = avgRating(venue.reviews);
  return { ...venue, ...ratings };
}

/* =====================================================================
 * SPORTS VENUES — 12 listings across India's major sporting cities.
 * Pricing benchmarked against Hudle, Playo & PlayPal aggregators.
 * ===================================================================== */
const SPORTS_VENUES = [
  {
    name: 'The Turf Park — Bandra, Mumbai',
    tagline: 'Floodlit 6-a-side football & box cricket turf, 5 min from Bandra Stn.',
    description:
      'A premium FIFA-spec artificial turf in the heart of Bandra West, popular with Mumbai office leagues and weekend social games. The pitch is fully enclosed with high ball-stop netting, sight screens for box cricket, and 8 LED floodlight towers giving stadium-grade visibility till midnight.\n\nFacilities include 4 changing rooms with hot showers, drinking water RO points, a small cafe serving energy drinks & snacks, and free Wi-Fi. Valet parking for 25 cars and 60 bikes is included. Match officials and umpires can be arranged with 48-hour notice. The venue has hosted the Mumbai Corporate Premier League for three consecutive seasons.',
    tags: ['Football', 'Box Cricket', 'FIFA Turf', 'Floodlights', 'Bandra'],
    location: {
      address: 'Carter Road, Near Otters Club, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    area: 0.85,
    areaUnit: 'acres',
    boundarySize: '60m × 40m enclosed',
    capacity: 16,
    photos: [...TURF_PARK_BANDRA],
    sportsDetails: {
      surfaceType: 'FIFA-quality artificial turf (60mm)',
      sportsAllowed: 'Football (6-a-side), Box Cricket (7-a-side)',
      peakHoursStart: '18:00',
      peakHoursEnd: '23:00',
      advanceBookingDays: 14,
      equipmentIncluded: 'Bibs, goalposts, cones, match balls & stumps',
    },
    pricing: { hourly: 1800, daily: 12500, halfDay: 7500 },
    reviews: [
      { authorName: 'Aniket Sharma', rating: 5, comment: 'Best turf in Western Mumbai hands down. Turf bounce is consistent and the floodlights are genuinely bright till 11 PM. Booked here every Tuesday for our office league.', visitType: 'Corporate league' },
      { authorName: 'Sneha Iyer', rating: 5, comment: 'Hosted my brother’s 30th here as a surprise football match. Staff helped set up jerseys and even arranged a cake table near the dugout. Worth every rupee.', visitType: 'Birthday football' },
      { authorName: 'Rohan Mehta', rating: 4, comment: 'Pitch quality is excellent but parking near Carter Road can be tight on Saturday evenings. The valet team handled it well though. Booking via WhatsApp was instant.', visitType: '6-a-side match' },
      { authorName: 'Faizal Khan', rating: 5, comment: 'Played a box cricket league here. Sight screens are proper, balls don’t get lost over the nets. Cafe samosas are surprisingly good at 9 PM!', visitType: 'Box cricket league' },
    ],
  },
  {
    name: 'Sportz Village — Koregaon Park, Pune',
    tagline: 'All-weather 5-a-side football pitch with rooftop cafe.',
    description:
      'A dedicated 5-a-side football arena in Pune’s buzzing Koregaon Park, designed for after-work games and weekend tournaments. The cushioned third-generation turf was relaid in early 2024 and offers excellent grip even during the monsoon — the venue has zero rain cancellations on record this year.\n\nThe pitch is wrapped in 6m-high netting and lit by 6 LED towers. A rooftop cafe overlooks the pitch with seating for 30 spectators, serving cold-pressed juices and post-match meals. Equipment rental (boots, shin guards, jerseys) is available at ₹150 per kit. Coaching sessions for kids run every Saturday morning under former I-League player Vinay Naik.',
    tags: ['Football', '5-a-side', 'Turf', 'Koregaon Park', 'Coaching'],
    location: {
      address: 'Lane 7, Koregaon Park, Opp German Bakery',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    area: 0.5,
    areaUnit: 'acres',
    boundarySize: '42m × 28m',
    capacity: 12,
    photos: [...SPORTZ_VILLAGE_PUNE],
    sportsDetails: {
      surfaceType: '3G cushioned artificial turf (50mm)',
      sportsAllowed: 'Football',
      peakHoursStart: '17:30',
      peakHoursEnd: '22:30',
      advanceBookingDays: 10,
      equipmentIncluded: 'Bibs, cones, 2 match balls, goalkeeper gloves',
    },
    pricing: { hourly: 1200, daily: 8500, halfDay: 5000 },
    reviews: [
      { authorName: 'Vikram Deshmukh', rating: 5, comment: 'Played here every Wednesday for 6 months. Surface still feels new, drainage is fantastic during monsoon, and the cafe upstairs has good filter coffee. Owner Rohan is hands-on.', visitType: 'Weekly 5-a-side' },
      { authorName: 'Neha Patil', rating: 4, comment: 'My 9-year-old’s weekend coaching is here. Coach Vinay is patient with beginners. Pitch is slightly narrow for full 6-a-side but perfect for kids.', visitType: 'Kids football clinic' },
      { authorName: 'Arvind Kulkarni', rating: 5, comment: 'KP location is super convenient post-office. Booking on the app, paying via UPI, and walking in — no hassles. Highly recommend the 7 PM slot.', visitType: 'Office team game' },
    ],
  },
  {
    name: 'Cricbuzz Cricket Academy — Indiranagar, Bengaluru',
    tagline: 'Six professional practice lanes with bowling machine & coach support.',
    description:
      'Bengaluru’s most-booked practice nets facility, used by Karnataka State Cricket Association junior teams and corporate weekend leagues. Six full-length lanes (4 turf, 2 cement) are maintained daily by a dedicated groundsman, with vertical netting between lanes for safety.\n\nThe star attraction is the BOLA bowling machine in Lane 1 — bookable separately at ₹250/half-hour. Resident coach Manjunath KS, a former Ranji player, offers one-on-one sessions on weekends. The facility includes a kit room with helmets, pads & gloves for hire (₹100/set), water dispensers, and a small physio corner. Early-bird 6-8 AM slots get a 25% discount, popular with college teams.',
    tags: ['Cricket', 'Practice Nets', 'Bowling Machine', 'Indiranagar', 'Coaching'],
    location: {
      address: '12th Main Road, 100 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    area: 0.7,
    areaUnit: 'acres',
    boundarySize: '6 lanes × 22 yards each',
    capacity: 20,
    photos: [...CRICBUZZ_INDIRANAGAR],
    sportsDetails: {
      surfaceType: 'Turf lanes (4) + cement lanes (2)',
      sportsAllowed: 'Cricket (practice only)',
      peakHoursStart: '06:00',
      peakHoursEnd: '09:00',
      advanceBookingDays: 21,
      equipmentIncluded: 'Stumps, sight screen, BOLA machine (extra)',
    },
    pricing: { hourly: 800, daily: 5500, halfDay: 3200 },
    reviews: [
      { authorName: 'Karthik Raghavan', rating: 5, comment: 'Bowling machine is well-calibrated, can go up to 130 kmph. Coach Manju gave me tips on shuffle that fixed my LBW issue. Lanes are top-class for Bangalore.', visitType: 'Personal practice + coaching' },
      { authorName: 'Ananya Bhat', rating: 4, comment: '6 AM slot is peaceful and 25% cheaper. Evening slots get crowded — book at least 4 days ahead during IPL season. Washrooms are clean.', visitType: 'Morning practice' },
      { authorName: 'Suresh Gowda', rating: 5, comment: 'Corporate team booking — 4 lanes for 2 hours including 1 with bowling machine. Total around ₹4500. Best value in Indiranagar.', visitType: 'Corporate nets' },
      { authorName: 'Priya Reddy', rating: 4, comment: 'Helmet rental is convenient for travellers like me. Pads were a bit worn but functional. Pitch quality of turf lanes is genuinely good.', visitType: 'Weekend practice' },
    ],
  },
  {
    name: 'Khel Maidan Sports Hub — Dwarka, Delhi',
    tagline: 'West Delhi’s largest enclosed multi-sport turf — cricket, football & frisbee.',
    description:
      'A 1.2-acre fully enclosed turf in Sector 12 Dwarka, ideal for society tournaments, school sports days and college fests. The synthetic grass is third-generation and 60mm thick, suitable for both cricket and football. The venue regularly hosts the Dwarka Premier Cricket League finals and the JNU Football Cup.\n\nTiered spectator seating accommodates 80 guests, with shaded zones for parents during kids’ tournaments. The pavilion has 6 changing rooms, women’s and men’s washrooms with separate entries, free Wi-Fi, and a small canteen run by the venue partner. First-aid kit and trained first-aider on site during tournament bookings. Power backup ensures floodlights run uninterrupted.',
    tags: ['Cricket', 'Football', 'Tournament Venue', 'Dwarka', 'School Events'],
    location: {
      address: 'Plot 8, Sector 12, Dwarka',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110078',
    },
    area: 1.2,
    areaUnit: 'acres',
    boundarySize: '90m × 60m enclosed',
    capacity: 30,
    photos: [...KHEL_MAIDAN_DWARKA],
    sportsDetails: {
      surfaceType: '3G Synthetic grass turf (60mm)',
      sportsAllowed: 'Cricket, Football, Ultimate Frisbee',
      peakHoursStart: '16:00',
      peakHoursEnd: '22:00',
      advanceBookingDays: 14,
      equipmentIncluded: 'Stumps, corner flags, bibs, cones, 2 match balls',
    },
    pricing: { hourly: 1500, daily: 11000, halfDay: 6500 },
    reviews: [
      { authorName: 'Amit Tyagi', rating: 5, comment: 'Hosted our 16-team society cricket tournament over a weekend. Floodlights handled night finals brilliantly, and Vikas at the front desk coordinated all 32 team check-ins smoothly.', visitType: 'Society tournament' },
      { authorName: 'Deepika Lamba', rating: 5, comment: 'My daughter’s school football tournament — they accommodated 12 schools across 2 days. Tiered seating for parents was a big win. Safe environment for U-12s.', visitType: 'School tournament' },
      { authorName: 'Rajat Singh', rating: 4, comment: 'Massive ground for Delhi standards. Only concern is the road to Sector 12 gets jammed on Sunday evenings, plan extra commute time. Inside everything is sorted.', visitType: 'Weekend football' },
    ],
  },
  {
    name: 'Sportzone Arena — Gachibowli, Hyderabad',
    tagline: 'AC indoor badminton courts + outdoor cricket strip in IT hub.',
    description:
      'A modern indoor-outdoor sports complex serving Gachibowli & Madhapur’s IT crowd. Four wooden-floor badminton courts inside an air-conditioned hall (Olympic-spec lines, BWF-certified flooring laid 2023), plus a 70m outdoor cricket strip for fielding drills and corporate sports days.\n\nThe complex includes a sports cafe (Sportzone Bistro) serving South Indian breakfast on weekend mornings — a favourite post-game tradition. Pro shop on premises stocks Yonex shuttlecocks, racket re-stringing service, and cricket gear. Corporate IT teams from Microsoft, Amazon and DLF tower regularly book the venue for monthly sports days. Coaching academies (badminton & cricket) operate from 4 PM weekdays.',
    tags: ['Badminton', 'Cricket Drills', 'AC Courts', 'Gachibowli', 'Pro Shop'],
    location: {
      address: 'Financial District Road, Near DLF Cyber City, Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032',
    },
    area: 1.0,
    areaUnit: 'acres',
    boundarySize: '4 indoor courts + 70m outdoor strip',
    capacity: 20,
    photos: [...SPORTZONE_GACHIBOWLI],
    sportsDetails: {
      surfaceType: 'BWF wooden (indoor) / Matting (outdoor)',
      sportsAllowed: 'Badminton, Cricket fielding drills',
      peakHoursStart: '07:00',
      peakHoursEnd: '10:00',
      advanceBookingDays: 7,
      equipmentIncluded: 'Net setup; shuttlecocks & rackets on rent',
    },
    pricing: { hourly: 600, daily: 4200, halfDay: 2400 },
    reviews: [
      { authorName: 'Harish Vemula', rating: 5, comment: 'AC courts are a lifesaver for Hyderabad summers. Wooden flooring has just the right bounce. Booked 6 AM slot regularly with my buddies — instant confirmation on the app.', visitType: 'Weekly badminton' },
      { authorName: 'Lakshmi Narayanan', rating: 4, comment: 'Did our Cognizant team sports day here — 30 of us across badminton & cricket drills. The cafe handled all our breakfast for 30 people without fuss. Parking gets tight on weekdays.', visitType: 'Corporate sports day' },
      { authorName: 'Krishna Reddy', rating: 5, comment: 'Pro shop saved my evening — racket strings snapped mid-game, got it restrung in 15 mins for ₹250. That kind of service is rare. Court 3 has the best lighting.', visitType: 'Evening badminton' },
    ],
  },
  {
    name: 'Chennai Super Cricket Ground — OMR, Chennai',
    tagline: 'Natural grass pitch on OMR for serious weekend league cricket.',
    description:
      'One of the few remaining natural grass cricket grounds in Chennai city, located off the IT corridor on Old Mahabalipuram Road. The 22-yard cement pitch with grass outfield is maintained by groundsman Murugan (15 years experience), who rolls and waters the pitch every Friday for weekend fixtures. Full-size 65m boundary with sight screens at both ends.\n\nThe pavilion seats 80 spectators under tiled roofing, complete with an electronic scoreboard, two umpire rooms, and a small canteen serving coconut water, vada-sambar and filter coffee. Two changing rooms (one accessible). Strict rule: no metal-spiked footwear on grass. Hosts the OMR Corporate Cricket League (32 teams) every monsoon.',
    tags: ['Cricket', 'Natural Grass', 'League', 'OMR', 'Pavilion'],
    location: {
      address: 'OMR, Perungudi (Near Sholinganallur)',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600096',
    },
    area: 1.5,
    areaUnit: 'acres',
    boundarySize: 'Standard 65m boundary, full outfield',
    capacity: 30,
    photos: [...CHENNAI_SUPER_OMR],
    sportsDetails: {
      surfaceType: 'Natural grass outfield + cement pitch',
      sportsAllowed: 'Cricket (red ball + white ball)',
      peakHoursStart: '06:00',
      peakHoursEnd: '14:00',
      advanceBookingDays: 30,
      equipmentIncluded: 'Sight screens, scoreboard, stumps & bails',
    },
    pricing: { hourly: 2000, daily: 14000, halfDay: 8500 },
    reviews: [
      { authorName: 'Senthil Kumar', rating: 5, comment: 'Best natural pitch for tape-ball or season-ball matches in Chennai south. Outfield is true and fast, takes a fast bowler’s pace well. Murugan anna prepares the pitch like a pro.', visitType: 'League T20' },
      { authorName: 'Meera Jagannathan', rating: 4, comment: 'Pavilion is basic but spotless. The vada-sambar at lunch break is amazing. Pitch needs 2 days notice for proper prep — book at least a week ahead.', visitType: 'Inter-corporate friendly' },
      { authorName: 'Vignesh Iyer', rating: 5, comment: 'Hosted my college reunion 30-over game here. Scoreboard works, umpires they recommended were fair. Worth the OMR drive on a Sunday morning.', visitType: 'Friendly match' },
    ],
  },
  {
    name: 'GoalRush Football Arena — Salt Lake, Kolkata',
    tagline: 'Floodlit 7-a-side football with dugouts, perfect for Kolkata leagues.',
    description:
      'Kolkata’s most-loved 7-a-side venue, located in Salt Lake Sector III near City Centre. The 55m × 38m artificial turf was relaid in 2023 with monsoon-friendly drainage — Kolkata’s rain rarely cancels a match here. Covered concrete dugouts on both sides seat 8 substitutes each, a small but rare luxury in city pitches.\n\nThe venue is a regular host for the Kolkata Corporate Football League (KCFL) and East Bengal’s grassroots U-15 development program. Referee service for tournaments at ₹800/match. Powerful 8-tower LED lighting allows reliable midnight bookings — popular among ITC, Tata Steel and Wipro Kolkata teams for late shifts. Changing rooms, hot showers, drinking water and a Bengali snack counter (jhalmuri, kathi rolls) round out the experience.',
    tags: ['Football', '7-a-side', 'Floodlights', 'Salt Lake', 'Referee Service'],
    location: {
      address: 'CK Block, Sector III, Salt Lake City',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
    },
    area: 0.75,
    areaUnit: 'acres',
    boundarySize: '55m × 38m + dugouts',
    capacity: 18,
    photos: [...GOALRUSH_SALTLAKE],
    sportsDetails: {
      surfaceType: '3G Artificial turf (55mm)',
      sportsAllowed: 'Football (5/6/7-a-side)',
      peakHoursStart: '19:00',
      peakHoursEnd: '23:30',
      advanceBookingDays: 10,
      equipmentIncluded: 'Bibs (2 sets), match ball, cones, corner flags',
    },
    pricing: { hourly: 1100, daily: 8000, halfDay: 4800 },
    reviews: [
      { authorName: 'Subhojit Banerjee', rating: 5, comment: 'Played KCFL home games here for 2 seasons. Drainage during August matches is incredible — never had a washout. Floodlights are bright enough for crisp passing till midnight.', visitType: 'KCFL match' },
      { authorName: 'Anjali Roy', rating: 4, comment: 'Booked for my husband’s 35th birthday football. The kathi roll counter was a sweet touch, guests loved it. Fair pricing for Salt Lake. Dugouts are spacious enough.', visitType: 'Birthday football' },
      { authorName: 'Sandeep Ghosh', rating: 5, comment: 'Referee they assigned was experienced, kept game tempo high. Honest pricing — no hidden floodlight surcharges. Best 7-a-side in Salt Lake.', visitType: '7-a-side tournament' },
    ],
  },
  {
    name: 'Smash Tennis Club — SG Highway, Ahmedabad',
    tagline: 'Two clay courts + practice wall, members and casual bookings welcome.',
    description:
      'Ahmedabad’s most maintained clay tennis facility along the SG Highway corridor, popular with morning regulars and corporate professionals. Both clay courts are rolled and watered daily by the resident groundsman, with line-mark refreshes every Sunday. A practice wall in the corner is open free of cost for warm-ups.\n\nThe adjacent 50m artificial lawn doubles as a tennis-ball cricket strip and weekend yoga lawn (Sunday 7 AM Vinyasa class, ₹200 drop-in). The clubhouse serves filter coffee, fresh lime soda and protein-rich post-game meals. Racket rental at ₹100/hour, tennis balls at ₹400/dozen. Member ID gets 10% off hourly rates plus priority booking. Coaching with former state-level player Coach Hardik available Tue/Thu/Sat evenings.',
    tags: ['Tennis', 'Clay Court', 'Yoga Lawn', 'SG Highway', 'Coaching'],
    location: {
      address: 'Off SG Highway, Near Iskon Cross Roads, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054',
    },
    area: 0.9,
    areaUnit: 'acres',
    boundarySize: '2 clay courts + 50m lawn',
    capacity: 14,
    photos: [...SMASH_TENNIS_AHMEDABAD],
    sportsDetails: {
      surfaceType: 'Clay (tennis) / Artificial lawn (multi-use)',
      sportsAllowed: 'Tennis, Tennis-ball Cricket, Yoga',
      peakHoursStart: '06:00',
      peakHoursEnd: '09:00',
      advanceBookingDays: 14,
      equipmentIncluded: 'Court setup; rackets/balls on rent',
    },
    pricing: { hourly: 700, daily: 4500, halfDay: 2700 },
    reviews: [
      { authorName: 'Harsh Patel', rating: 4, comment: 'Clay courts are rolled properly every morning, surface plays true. Lawn for tennis-ball cricket is a bonus when family wants to join. Coach Hardik’s sessions improved my serve significantly.', visitType: 'Tennis coaching' },
      { authorName: 'Kiran Mehta', rating: 5, comment: 'Affordable for Ahmedabad. 6 AM slot is peaceful and weather-perfect. Staff is courteous, drinking water always cold. Sunday yoga lawn is a hidden gem.', visitType: 'Morning tennis' },
      { authorName: 'Anjali Dave', rating: 5, comment: 'Took 6 weekly coaching sessions for my 14-year-old. Court is safe, coach is patient with juniors. Membership for ₹4000/year is good value if you play 2+ times a week.', visitType: 'Junior coaching' },
    ],
  },
  {
    name: 'Pink City Cricket Box — Vaishali Nagar, Jaipur',
    tagline: 'Budget-friendly turf box for college fests, society teams & friend groups.',
    description:
      'Jaipur’s most-booked box cricket venue, located in Vaishali Nagar near Pink Square Mall. The 58m × 40m artificial turf box is enclosed in 12m-high netting and lit by 4 LED towers, allowing play till 10 PM (post that, music is shut off per local noise norms). The venue specifically caters to Jaipur’s student crowd — flat, transparent pricing with no hidden costs.\n\nCollege festivals like JECRC TechFest and Manipal University’s Sport Week have hosted their finals here. A small snacks counter at the gate sells cold drinks, kachori-sabzi and ice cream. Strictly no outside alcohol policy. Free parking for 30 bikes and 8 cars. Music speakers available on prior approval (₹500 add-on for sound system).',
    tags: ['Box Cricket', 'College Friendly', 'Budget', 'Vaishali Nagar', 'Turf'],
    location: {
      address: 'Vaishali Nagar Sector 4, Behind Pink Square Mall',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302021',
    },
    area: 0.55,
    areaUnit: 'acres',
    boundarySize: '58m × 40m box',
    capacity: 14,
    photos: [...PINK_CITY_JAIPUR],
    sportsDetails: {
      surfaceType: 'Artificial turf (40mm)',
      sportsAllowed: 'Cricket (box format)',
      peakHoursStart: '17:00',
      peakHoursEnd: '22:00',
      advanceBookingDays: 5,
      equipmentIncluded: 'Stumps, tennis ball cricket balls (extra)',
    },
    pricing: { hourly: 700, daily: 5000, halfDay: 3000 },
    reviews: [
      { authorName: 'Rohit Jangid', rating: 5, comment: 'Our JECRC final was here — 16 teams over a weekend. Pricing was the cheapest decent turf in Jaipur for our budget. Lights handled the night finals, no power cuts.', visitType: 'College tournament' },
      { authorName: 'Pooja Sharma', rating: 4, comment: 'Society Diwali match — everyone from kids to uncles played. Lights are good enough. Tip: gets dusty in May, carry your own grip shoes. Snack stall samosas are decent.', visitType: 'Society match' },
      { authorName: 'Aakash Bairwa', rating: 5, comment: 'Birthday cricket with 11 friends, total damage ₹2100 for 3 hours. Very fair. No drama with staff, no hidden charges. Will definitely repeat.', visitType: 'Birthday cricket' },
    ],
  },
  {
    name: 'Awadh Sports Turf — Gomti Nagar, Lucknow',
    tagline: 'Family-friendly cricket & football turf with kids coaching academy.',
    description:
      'Lucknow’s premier multi-sport turf in Vibhuti Khand, designed with families in mind. Shaded covered seating for 50 spectators, a dedicated kids’ play corner near the entrance, clean and well-lit washrooms including a recently-added women’s changing room with vanity. The synthetic turf (Yotex 50mm) is fully drainable, monsoon-ready.\n\nSunday morning kids’ football clinics (8-14 yrs) are run by Coach Tariq, a former Mohun Bagan trialist. The Hazratganj Football League’s qualifying rounds are hosted here every February. Honest, all-inclusive pricing — no surge on weekends, no extra ground fees at checkout. Power backup ensures floodlights never trip. Two-wheeler parking is plentiful; 4-wheeler parking for 20 cars on adjacent plot.',
    tags: ['Cricket', 'Football', 'Family Friendly', 'Kids Coaching', 'Gomti Nagar'],
    location: {
      address: 'Vibhuti Khand, Near Lulu Mall, Gomti Nagar',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226010',
    },
    area: 1.0,
    areaUnit: 'acres',
    boundarySize: '75m × 50m',
    capacity: 22,
    photos: [...AWADH_LUCKNOW],
    sportsDetails: {
      surfaceType: 'Yotex synthetic turf (50mm)',
      sportsAllowed: 'Cricket (box), Football (6/7-a-side)',
      peakHoursStart: '16:30',
      peakHoursEnd: '21:30',
      advanceBookingDays: 10,
      equipmentIncluded: 'Cones, bibs, stumps, 1 match ball',
    },
    pricing: { hourly: 650, daily: 4500, halfDay: 2800 },
    reviews: [
      { authorName: 'Imran Ahmed', rating: 5, comment: 'My son’s Sunday football clinic — Coach Tariq is patient with under-10s. Kids actually learn dribbling drills, not just play freely. Worth every paisa of the ₹1500/month fee.', visitType: 'Kids football clinic' },
      { authorName: 'Shreya Tiwari', rating: 4, comment: 'Easy access from Lulu Mall area. Turf quality is genuinely good for Lucknow standards. Wish they had more car parking on Sunday evenings — bikes are easy though.', visitType: 'Cricket league' },
      { authorName: 'Vivek Ojha', rating: 5, comment: 'Honest pricing is what brought me back. No hidden ₹200 ground fee at checkout like other places. Family vibe — even brought my parents to watch finals.', visitType: 'Weekend booking' },
      { authorName: 'Neha Mishra', rating: 4, comment: 'Women’s changing room is a thoughtful addition. Played mixed-team box cricket with office colleagues. Lighting is excellent post-sunset.', visitType: 'Office cricket' },
    ],
  },
  {
    name: 'PowerPlay Sports — Whitefield, Bengaluru',
    tagline: 'Premium box cricket + 5-a-side football near ITPL.',
    description:
      'Whitefield’s newest premium turf venue, opened mid-2024 and already a favourite of the ITPL tech crowd. Two turf zones — a 60m × 40m box cricket pitch and a separate 5-a-side football pitch — operate independently with their own floodlight banks, meaning you can host two simultaneous games or full-day corporate sports leagues.\n\nThe state-of-the-art clubhouse has air-conditioned changing rooms, lockers, hot showers, a smoothie & protein shake bar, and Wi-Fi throughout. The venue is one of the few in Bengaluru offering live match streaming via overhead cameras (additional ₹2000/match), popular with corporate tournaments wanting highlight reels. Tata Consultancy Services, Infosys & Wipro have annual sport-day packages here. Premium pricing reflects facilities; pre-pay weekday slots get 15% off.',
    tags: ['Box Cricket', 'Football', 'Premium', 'Whitefield', 'Live Streaming'],
    location: {
      address: 'EPIP Zone, Whitefield, Near ITPL Main Gate',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    area: 1.1,
    areaUnit: 'acres',
    boundarySize: '60m × 40m box + 42m × 28m football',
    capacity: 24,
    photos: [...POWERPLAY_WHITEFIELD],
    sportsDetails: {
      surfaceType: 'FIFA-quality turf (cricket) + 3G turf (football)',
      sportsAllowed: 'Box Cricket, Football',
      peakHoursStart: '18:00',
      peakHoursEnd: '23:00',
      advanceBookingDays: 14,
      equipmentIncluded: 'All match equipment + optional streaming',
    },
    pricing: { hourly: 1600, daily: 11500, halfDay: 6800 },
    reviews: [
      { authorName: 'Pranav Kumar', rating: 5, comment: 'TCS team booked the full ground for our annual sports day — 60 of us across cricket & football simultaneously. Premium experience, AC changing rooms after sweaty games was a luxury.', visitType: 'Corporate sports day' },
      { authorName: 'Sandhya Bhat', rating: 4, comment: 'Pricier than other Whitefield turfs but the live streaming feature for our IPL-style office tournament was a hit. Smoothie bar is genuinely good too.', visitType: 'Office tournament' },
      { authorName: 'Aravind Pillai', rating: 5, comment: 'Booked Tuesday evening 7 PM for box cricket with friends. Pre-pay discount made it work for our budget. Pitch quality is among the best in Bengaluru.', visitType: 'Weekly box cricket' },
    ],
  },
  {
    name: 'Smash Arena Badminton — HSR Layout, Bengaluru',
    tagline: '8 BWF-spec courts inside Bengaluru’s busiest badminton hub.',
    description:
      'A dedicated 8-court indoor badminton facility in HSR Layout, the city’s shuttle-mad neighbourhood. All courts are BWF-certified wooden flooring with proper line markings and high ceilings (12m clearance). The hall is fully air-conditioned, with separate seating zones, lockers, and a small physio room for stretch/strap support.\n\nResident coaches include former state champion Vinod KP (children’s programs) and Hyderabad-trained Aishwarya G (advanced players). Pro shop on premises by Yonex India — racket re-stringing turnaround is 30 minutes. Tournaments hosted: HSR Open Doubles, KSBA Sub-Junior Selection. Membership (₹6000/year) unlocks unlimited 1-hour daily play during off-peak hours. Free yoga add-on session on Saturday mornings for members.',
    tags: ['Badminton', '8 Courts', 'AC Hall', 'HSR Layout', 'BWF Certified'],
    location: {
      address: '27th Main, HSR Layout Sector 1',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
    },
    area: 0.6,
    areaUnit: 'acres',
    boundarySize: '8 indoor BWF courts',
    capacity: 32,
    photos: [...SMASH_ARENA_HSR],
    sportsDetails: {
      surfaceType: 'BWF-certified wooden flooring',
      sportsAllowed: 'Badminton',
      peakHoursStart: '18:00',
      peakHoursEnd: '22:00',
      advanceBookingDays: 7,
      equipmentIncluded: 'Net setup; shuttles & rackets on rent',
    },
    pricing: { hourly: 500, daily: 3500, halfDay: 2000 },
    reviews: [
      { authorName: 'Rakesh Iyengar', rating: 5, comment: 'Played at 4 different badminton venues across Bengaluru — Smash Arena’s flooring is the best for knee health. 12m ceiling means lift shots actually go up properly.', visitType: 'Weekly singles' },
      { authorName: 'Divya Krishnan', rating: 5, comment: 'Joined annual membership last year. Crossed 200 sessions, knees still happy. Coach Aishwarya helped me move from doubles club level to district team selection.', visitType: 'Advanced coaching' },
      { authorName: 'Manoj Reddy', rating: 4, comment: '8 PM peak hours are very crowded, book 3 days ahead. Morning 7-9 AM slots are peaceful and discounted. Restringing service is a genuine time-saver.', visitType: 'Evening doubles' },
    ],
  },
];

/* =====================================================================
 * EVENT VENUES — 12 listings spanning weddings, corporate, concerts,
 * heritage & exhibitions. INR pricing based on 2024-25 market rates
 * from WedMeGood, Sloshout, BookEventz aggregators.
 * ===================================================================== */
const EVENT_VENUES = [
  {
    name: 'Sea Breeze Lawn — Bandra, Mumbai',
    tagline: 'Boutique sea-facing wedding lawn for 200 guests, 5 min from Carter Road.',
    description:
      'A premium 14,000-sqft sea-facing lawn in Bandra West, ideal for intimate weddings, mehendi ceremonies, and milestone receptions. The property features a wooden mandap platform under a canopy of fairy lights, a separate cocktail strip with a built-in bar counter, and panoramic sunset views over the Arabian Sea.\n\nIn-house decor partners (Bandra Decor Co. & Ferns N Petals affiliate) offer curated floral packages starting ₹35,000. Catering is open — bring your own panel from a 12-vendor approved list. Valet parking for 60 cars and bike parking for 80, both included. Generator backup, 1000-litre water tank, dedicated bridal room with 3 makeup vanity stations, and 2 dressing rooms. The venue is licensed for live music till 10 PM; sound limit 80 dB per Bandra Police norms.',
    tags: ['Wedding', 'Sea-facing', 'Mehendi', 'Bandra', 'Mandap'],
    location: {
      address: 'Carter Road Promenade, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    area: 14000,
    areaUnit: 'sqft',
    boundarySize: 'Main lawn + cocktail strip + bridal pavilion',
    capacity: 220,
    photos: [...SEA_BREEZE_BANDRA],
    eventDetails: {
      seatedCapacity: 180,
      standingCapacity: 220,
      minGuests: 80,
      rooms: 2,
      washrooms: 8,
      dressingRooms: 2,
      parkingSpaces: 60,
      cateringAvailable: true,
    },
    pricing: { eventBased: 185000, daily: 285000, halfDay: 145000 },
    reviews: [
      { authorName: 'Aditi & Rohan', rating: 5, comment: 'Our sunset mehendi at Sea Breeze was straight out of a magazine. The Arabian Sea backdrop, the fairy lights as it got dark — guests are still talking about it 8 months later. Coordinator Asha was a rock.', visitType: 'Wedding mehendi' },
      { authorName: 'Sanjay Malhotra', rating: 4, comment: 'Hosted my daughter’s reception for 200. Vendor entry passes, valet, catering load-in — all coordinated by venue manager. Minor traffic noise after 9 PM on Carter Road, but inside the lawn it’s magical.', visitType: 'Wedding reception' },
      { authorName: 'Priya & Karan', rating: 5, comment: 'Booked Sea Breeze for our 20th anniversary vow renewal — 60 guests, sundowner format. Decor team transformed it beautifully on ₹50k budget. Bandra Decor Co. delivers.', visitType: 'Anniversary celebration' },
    ],
  },
  {
    name: 'Greenroom Banyan Lawn — Koregaon Park, Pune',
    tagline: 'Corporate offsites & product launches under 100-year-old banyan trees.',
    description:
      'A unique 11,000-sqft event lawn shaded by three heritage banyan trees, located in Pune’s leafiest neighbourhood. Designed specifically for corporate offsites, product launches, founders’ day events, and intimate weddings. The venue includes a projector-ready white-wall facade (suitable for video presentations and decals), an 80-seat theatre-style breakout setup, and two air-conditioned breakout rooms for workshops and 1:1s.\n\nHigh-speed dual-ISP Wi-Fi (1 Gbps each), unlimited tea/coffee/juice counter for half-day corporate bookings, and a dedicated AV team (sound + lights + projection) included for events above ₹50k. In-house catering panel includes Bedekar Caterers and Sahyadri Catering for Maharashtrian thali menus. Parking for 45 cars, valet included. The lawn has hosted Persistent Systems, KPIT, and Bajaj Auto for their annual events.',
    tags: ['Corporate Offsite', 'Product Launch', 'Lawn', 'Koregaon Park', 'AV-Ready'],
    location: {
      address: 'North Main Road, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    area: 11000,
    areaUnit: 'sqft',
    boundarySize: 'Central lawn + 2 breakout rooms + AV facade',
    capacity: 150,
    photos: [...GREENROOM_PUNE],
    eventDetails: {
      seatedCapacity: 120,
      standingCapacity: 150,
      minGuests: 40,
      rooms: 3,
      washrooms: 6,
      dressingRooms: 1,
      parkingSpaces: 45,
      cateringAvailable: true,
    },
    pricing: { eventBased: 95000, daily: 145000, halfDay: 65000 },
    reviews: [
      { authorName: 'Infosys Pune HR Team', rating: 5, comment: 'Annual Founders’ Day event for 120 leadership — venue managed AV, breakout sessions, lunch buffet seamlessly. The banyan tree backdrop made for beautiful corporate photos.', visitType: 'Corporate annual day' },
      { authorName: 'Megha Limaye', rating: 4, comment: 'Product launch for our SaaS startup — 130 attendees, 4 hour event. Wi-Fi held up for live-streaming. Lunch counter could be slightly bigger, queue got long at 1 PM.', visitType: 'Product launch' },
      { authorName: 'Rahul Bedekar', rating: 5, comment: 'Daughter’s engagement — 80 guests in evening cocktail format. The lawn under fairy lights with banyan canopy was stunning. Catering by Sahyadri was top-tier.', visitType: 'Engagement ceremony' },
    ],
  },
  {
    name: 'Aerocity Open-Air Stage — Whitefield, Bengaluru',
    tagline: 'Tech-corridor concerts, hackathons & demo days for up to 350 guests.',
    description:
      'Bengaluru’s go-to stage venue for startup launches, hackathons, music gigs, and college festivals. The 18,000-sqft event ground features a modular 24x12 ft elevated stage with truss lighting hooks, dedicated green room, separate VIP zone, and tiered audience seating. The venue has hosted YourStory TechSparks meetups, Bangalore Comedy Festival nights, and four IIM-B startup demo days.\n\nThe sound rig (JBL VTX, 4-way) is included up to 100 dB; ground licence allows live music till 10 PM and DJ till 11 PM. Outside catering is permitted with FSSAI certificate submission. Sponsor branding spots and merchandise tables (₹5k/table) available. Parking for 90 cars + 150 bikes on the adjacent ITPL service road. Ample power outlets for booths and demo stations make it a hackathon favourite.',
    tags: ['Concert', 'Hackathon', 'Startup Event', 'Whitefield', 'Stage Setup'],
    location: {
      address: 'ITPL Main Road, Opposite EPIP Industrial Area, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    area: 18000,
    areaUnit: 'sqft',
    boundarySize: 'Stage zone + audience tier + VIP + green room',
    capacity: 350,
    photos: [...AEROCITY_WHITEFIELD],
    eventDetails: {
      seatedCapacity: 220,
      standingCapacity: 350,
      minGuests: 50,
      rooms: 4,
      washrooms: 10,
      dressingRooms: 2,
      parkingSpaces: 90,
      cateringAvailable: true,
    },
    pricing: { eventBased: 175000, daily: 265000, halfDay: 125000 },
    reviews: [
      { authorName: 'Razorpay Events Team', rating: 5, comment: 'Hosted our developer meetup for 280 — venue team coordinated AV, registration desk, food stalls, and stage timings flawlessly. Speakers walked off stage straight into green room. Pro setup.', visitType: 'Tech meetup' },
      { authorName: 'BITS Goa Alumni Chapter', rating: 4, comment: 'Annual Bengaluru alumni meet — DJ till 11 PM, dinner buffet, networking zone. Entry road from ITPL gets jammed by 7 PM, plan transport buffers. Inside, vibes were 10/10.', visitType: 'Alumni event' },
      { authorName: 'Aditya Bhat — StartupOS', rating: 5, comment: 'Demo Day for 200 founders & VCs. Power outlets at every booth, decent Wi-Fi, stage power for live demos. Worth the premium pricing for production-grade events.', visitType: 'Demo day' },
    ],
  },
  {
    name: 'Farmhouse 42 — Chhatarpur, Delhi',
    tagline: 'Private farmhouse with poolside lawn & AC hall rain backup.',
    description:
      'A walled 16,000-sqft farmhouse in Delhi’s Chhatarpur farms belt, exclusive-use only for one event at a time. The property features a manicured lawn, a 30x15 ft pool with a wooden cocktail deck, an air-conditioned 4500-sqft indoor hall (rain backup or full move-in option), three bridal/dressing suites, and a fully-equipped catering kitchen.\n\nIn-house catering by Mughlai Saga and Chhatarpur Chefs offers veg, non-veg, Jain, and live counter formats — separate kitchen wings prevent cross-contamination. Decor partner Marigold Mansion specializes in Delhi-style mandap and pheras setups. The farmhouse is licensed for live DJ till 10 PM (Delhi noise norms). Generator backup (250 KVA), 24-hour security, 55 valet parking spots, and adjacent overflow parking on the lane for 30 more cars. Popular for sangeet, cocktail parties, and intimate weddings under 180 guests.',
    tags: ['Wedding', 'Sangeet', 'Farmhouse', 'Poolside', 'Chhatarpur'],
    location: {
      address: 'Chhatarpur Farms, Off Mehrauli-Gurgaon Road',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110074',
    },
    area: 16000,
    areaUnit: 'sqft',
    boundarySize: 'Pool lawn + AC hall + bridal suites',
    capacity: 180,
    photos: [...FARMHOUSE_42_DELHI],
    eventDetails: {
      seatedCapacity: 150,
      standingCapacity: 180,
      minGuests: 60,
      rooms: 3,
      washrooms: 7,
      dressingRooms: 3,
      parkingSpaces: 55,
      cateringAvailable: true,
    },
    pricing: { eventBased: 235000, daily: 365000, halfDay: 165000 },
    reviews: [
      { authorName: 'Nisha & Karan Bhatia', rating: 5, comment: 'Sangeet night by the pool was absolutely magical — we had 140 guests, DJ till 10 PM, and the in-house catering by Mughlai Saga was a hit (mutton kakori was the showstopper). Staff stayed till 2 AM pack-up.', visitType: 'Sangeet ceremony' },
      { authorName: 'Ravi Khanna', rating: 4, comment: 'Hosted my daughter’s wedding for 170 guests. Light rain at 7 PM — venue team moved the entire pheras setup from lawn to AC hall in 25 minutes. Slightly above our initial budget but truly worth it.', visitType: 'Wedding' },
      { authorName: 'Sunita Arora', rating: 5, comment: 'Cocktail evening for 80 — venue arranged 4 live counters, the pool deck looked stunning under blue LED lighting. Marigold Mansion decor turned ₹1.2L into a magazine spread.', visitType: 'Cocktail party' },
    ],
  },
  {
    name: 'SkyDeck Hitech Garden — Hyderabad',
    tagline: 'Rooftop terrace with skyline views for corporate dinners & networking.',
    description:
      'An elevated 8,500-sqft rooftop garden in Madhapur, overlooking the Hyderabad tech skyline. Designed for premium corporate events — leadership dinners, award nights, sundowners, and 80-120 guest cocktail evenings. The terrace features ambient string lighting, a built-in raised stage for keynotes, a 14-ft cocktail bar counter, and a separate covered pavilion as rain backup.\n\nElevator access (4 lifts) makes the venue fully accessible for elderly guests; wheelchair ramp at the entry. In-house F&B menu features Hyderabadi specialities (biryani station, haleem in season) plus continental & live counters. Wind side-screens deployed Nov-Feb for cooler months. Premium AV setup (Bose L1 sound + 4K projector + mic array) included for corporate bookings above ₹50k. Microsoft, Deloitte, and Pharma Corp Hyderabad host annual rewards & recognition nights here.',
    tags: ['Corporate Dinner', 'Rooftop', 'Skyline View', 'Madhapur', 'Awards Night'],
    location: {
      address: 'HITEC City Main Road, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
    },
    area: 8500,
    areaUnit: 'sqft',
    boundarySize: 'Open terrace + covered pavilion + stage',
    capacity: 120,
    photos: [...SKYDECK_HYDERABAD],
    eventDetails: {
      seatedCapacity: 100,
      standingCapacity: 120,
      minGuests: 35,
      rooms: 1,
      washrooms: 5,
      dressingRooms: 1,
      parkingSpaces: 35,
      cateringAvailable: true,
    },
    pricing: { eventBased: 115000, daily: 175000, halfDay: 75000 },
    reviews: [
      { authorName: 'Deloitte Hyderabad HR', rating: 5, comment: 'Year-end leadership dinner for 90 senior consultants. The skyline view at twilight + Hyderabadi haleem station = absolute crowd-pleaser. Service team was discreet and efficient throughout.', visitType: 'Leadership dinner' },
      { authorName: 'David Pereira', rating: 4, comment: 'Networking dinner in December — got windy by 9 PM, venue team deployed side screens within 15 mins. Bose sound was clear even for our 100-person crowd. Good value for the views.', visitType: 'Networking dinner' },
      { authorName: 'Microsoft IDC Team', rating: 5, comment: 'Awards night for 110 engineers. The raised stage worked well for trophy handovers, projector showed clear visuals from the back rows. Biryani counter cleared everything by 9:30 PM.', visitType: 'Awards night' },
    ],
  },
  {
    name: 'Coromandel Beach Lawn — ECR, Chennai',
    tagline: 'Coastal lawn for sunset receptions, beach weddings & photo shoots.',
    description:
      'A 15,000-sqft coastal property on Chennai’s East Coast Road, with sea breeze and a coconut grove backdrop. The lawn is one of Chennai’s most-photographed wedding venues, featured in 30+ wedding photographer portfolios. Beach access is a 5-minute private walkway through the grove — popular for couple shoots at golden hour.\n\nThe venue handles up to 200 guests with a beach-view dining lawn, a small grove pavilion for ceremonies, and a private bridal suite with sea-view. In-house catering by Coast Catering specializes in seafood and Chettinad cuisine. Strict 85 dB sound limit after 9 PM (TN coastal zone norms). Decor partner specializes in driftwood, conch, and coastal-themed setups. 70 parking spaces on internal lot plus 30 valet-managed overflow on ECR shoulder.',
    tags: ['Beach Wedding', 'Reception', 'ECR', 'Sunset', 'Photo Shoot'],
    location: {
      address: 'ECR, Near MGM Beach Resorts, Uthandi',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600119',
    },
    area: 15000,
    areaUnit: 'sqft',
    boundarySize: 'Beach-view lawn + grove pavilion + bridal suite',
    capacity: 200,
    photos: [...COROMANDEL_ECR],
    eventDetails: {
      seatedCapacity: 160,
      standingCapacity: 200,
      minGuests: 70,
      rooms: 2,
      washrooms: 8,
      dressingRooms: 2,
      parkingSpaces: 70,
      cateringAvailable: true,
    },
    pricing: { eventBased: 165000, daily: 245000, halfDay: 115000 },
    reviews: [
      { authorName: 'Divya & Arun Iyer', rating: 5, comment: 'Our sunset wedding photos at Coromandel are now my profile picture and they’re hanging in our home. The grove walk to the beach for couple shots is a dream. Catering — Chettinad chicken was incredible.', visitType: 'Beach reception' },
      { authorName: 'Vasanth Events Co.', rating: 4, comment: 'Conducted 5 client weddings here over 18 months. Venue is consistent on service. Tip: monitor wind for draping decor — afternoon sea breeze can be strong, plan reinforced setups.', visitType: 'Wedding planner regular' },
      { authorName: 'Meera & Akash', rating: 5, comment: 'Pre-wedding photo shoot at golden hour — venue allowed 4 hours of access for ₹25k including a small lunch counter. Coastal pavilion shots came out gorgeous. Highly recommend.', visitType: 'Pre-wedding shoot' },
    ],
  },
  {
    name: 'Park Street Heritage Bungalow — Kolkata',
    tagline: 'Colonial-era courtyard for boutique weddings, adda nights & art events.',
    description:
      'A restored 1920s colonial bungalow in Park Street with a 7,500-sqft central terracotta courtyard — Kolkata’s most-Instagrammed boutique wedding venue. The architecture features wrap-around verandas, original cast-iron railings, and arches strung with seasonal fairy lights. Capacity is capped at 100 guests intentionally to preserve the intimate heritage atmosphere.\n\nThe property hosts boutique weddings, engagement parties, milestone birthdays, book launches, jazz evenings, and Kolkata’s famous adda gatherings. Live music license valid till 10:30 PM (rare for Park Street). In-house catering by Bhojohori Manna offers authentic Bengali wedding menus (kosha mangsho, ilish bhapa). Heritage compliance means no nails on walls — decor uses string suspensions and floor-standing arches. Parking is constrained (25 valet spots) but Park Street metro is 4 mins walk.',
    tags: ['Heritage', 'Boutique Wedding', 'Park Street', 'Bengali Catering', 'Jazz Evenings'],
    location: {
      address: 'Park Street, Near Park Mansions',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016',
    },
    area: 7500,
    areaUnit: 'sqft',
    boundarySize: 'Courtyard + wrap-around veranda + 2 anterooms',
    capacity: 100,
    photos: [...PARK_STREET_KOLKATA],
    eventDetails: {
      seatedCapacity: 80,
      standingCapacity: 100,
      minGuests: 30,
      rooms: 2,
      washrooms: 4,
      dressingRooms: 1,
      parkingSpaces: 25,
      cateringAvailable: true,
    },
    pricing: { eventBased: 95000, daily: 145000, halfDay: 65000 },
    reviews: [
      { authorName: 'Sohini Dasgupta', rating: 5, comment: 'Our 80-guest wedding — courtyard wrapped in marigold and lights felt like a Satyajit Ray set. Bhojohori Manna’s kosha mangsho is still the talk of the family. Heritage charm is real, not gimmicky.', visitType: 'Boutique wedding' },
      { authorName: 'Ayan Banerjee', rating: 5, comment: 'Hosted my parents’ 50th anniversary — 60 guests, jazz trio till 10:30 PM, Bengali high tea spread. Venue managers are knowledgeable about heritage care, every detail thought through.', visitType: '50th anniversary' },
      { authorName: 'Park Street Art Club', rating: 4, comment: 'Held our quarterly book launch + reading evening here for 50 guests. Acoustic was perfect under the veranda. Only minor — parking is tight, communicate metro option to guests in advance.', visitType: 'Book launch' },
    ],
  },
  {
    name: 'Sabarmati Riverfront Pavilion — Ahmedabad',
    tagline: 'Riverfront deck for exhibitions, cultural shows & food festivals.',
    description:
      'A 20,000-sqft open-deck event space on the Sabarmati Riverfront, near the Ashram Road bridge. Designed primarily for exhibitions, trade fairs, cultural evenings, and Garba/Navratri events. The deck features 60 modular stall bays (12x10 ft each) with built-in power outlets, a 30x18 ft central stage with a steel truss, and clear sightlines to the river.\n\nThe venue manager coordinates Government of Gujarat event permits — a real help for first-time organisers. The Gujarat Handicraft Fair (annual, 4 days) and 12-day Navratri Garba nights are anchor events. Catering must be brought in (12 partner caterers on panel); the venue does not have in-house F&B. Free public footfall from the riverfront walkway adds to event reach. Parking for 100 cars at the adjacent Riverfront East lot, 200 more across the bridge. Sound license till 11 PM for cultural events.',
    tags: ['Exhibition', 'Cultural Show', 'Riverfront', 'Garba', 'Food Festival'],
    location: {
      address: 'Riverfront Event Centre East Bank, Ashram Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
    },
    area: 20000,
    areaUnit: 'sqft',
    boundarySize: 'Deck + 60 stall bays + central stage',
    capacity: 400,
    photos: [...SABARMATI_AHMEDABAD],
    eventDetails: {
      seatedCapacity: 280,
      standingCapacity: 400,
      minGuests: 100,
      rooms: 2,
      washrooms: 12,
      dressingRooms: 2,
      parkingSpaces: 100,
      cateringAvailable: false,
    },
    pricing: { eventBased: 135000, daily: 195000, halfDay: 95000 },
    reviews: [
      { authorName: 'Gujarat Handicraft Fair Committee', rating: 4, comment: 'Annual 4-day fair — venue team handled stall layouts, electrical points, and crowd management well. Public footfall from riverfront walkers added to our sales. Wash facilities for 12 washrooms were adequate.', visitType: '4-day exhibition' },
      { authorName: 'Sabarmati Navratri Committee', rating: 5, comment: '9-night Garba — venue capacity handled 400 dancers + 200 viewers comfortably. Stage view from audience tier is clear. Permit assistance saved us 3 weeks of paperwork. Worth every paisa.', visitType: 'Navratri Garba' },
      { authorName: 'Ahmedabad Food Festival', rating: 4, comment: 'Hosted 35 food vendors for a weekend fest. Stall power load handled fryers, tandoors, and live counters fine. Catering not in-house meant our food vendors had full flexibility. Solid B2B venue.', visitType: 'Food festival' },
    ],
  },
  {
    name: 'Amer View Royal Lawn — Jaipur',
    tagline: 'Destination wedding lawn with Amer Fort & Aravalli backdrop.',
    description:
      'Jaipur’s most-coveted destination wedding venue — a 22,000-sqft hill-side lawn 20 minutes from Amer Fort with panoramic fort and Aravalli mountain views. The property features three terraced lawn levels (ceremony lawn, mandap lawn, cocktail lawn), each with its own decor identity. The fort backdrop is so iconic that the venue has been featured in 8 destination wedding magazines including Vogue India Weddings.\n\nFireworks-friendly with prior permit (rare in Jaipur). Adjacent guest cottages (24 rooms across 3 villas) bookable as a wedding combo — perfect for 2-3 day destination weddings. In-house catering by Royal Rajasthani Caterers includes authentic Marwari & Rajputana menus (laal maas, ker sangri, ghevar). Decor partner Pink City Events specializes in maharaja-themed mandaps with elephants & vintage cars (extra). Sound license till 11 PM. Parking for 85 cars on internal road; shuttle for guests from nearby hotels.',
    tags: ['Destination Wedding', 'Fort View', 'Mehendi', 'Jaipur', 'Fireworks'],
    location: {
      address: 'Kesar Bagh Road, 4 km from Amer Fort',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302028',
    },
    area: 22000,
    areaUnit: 'sqft',
    boundarySize: '3 terraced lawns + bridal suites + cottage block',
    capacity: 300,
    photos: [...AMER_VIEW_JAIPUR],
    eventDetails: {
      seatedCapacity: 240,
      standingCapacity: 300,
      minGuests: 100,
      rooms: 5,
      washrooms: 10,
      dressingRooms: 3,
      parkingSpaces: 85,
      cateringAvailable: true,
    },
    pricing: { eventBased: 325000, daily: 485000, halfDay: 225000 },
    reviews: [
      { authorName: 'Pooja & Aditya — Mumbai', rating: 5, comment: '3-day destination wedding for 180 guests from Mumbai. Fort backdrop for pheras + fireworks at 9 PM + Marwari laal maas dinner = unforgettable. Cottage block for close family stay was the cherry on top.', visitType: '3-day destination wedding' },
      { authorName: 'Pink City Events Pvt Ltd', rating: 4, comment: 'Planned 12 weddings at Amer View since 2022. Venue is reliable, manager Bhanwar Singh handles vendor coordination expertly. Road from highway is narrow — advise smaller AC buses, not 30-seaters.', visitType: 'Wedding planner regular' },
      { authorName: 'Riya & Sahil — Delhi', rating: 5, comment: 'Mehendi ceremony for 120, evening cocktail under the stars with fort lit up. Vogue-worthy is no exaggeration. Premium pricing but every paisa visible in the experience.', visitType: 'Mehendi + cocktail' },
    ],
  },
  {
    name: 'Gomti Riverside Banquet Garden — Lucknow',
    tagline: 'Expansive riverside lawn for grand weddings & food festivals up to 500.',
    description:
      'A 25,000-sqft Gomti riverfront lawn with covered dining pavilion, popular for grand Lucknowi weddings, political gatherings, and Awadhi food festivals. The venue handles 400-500 guest events comfortably with separate ceremony lawn, cocktail strip, and a 6,000-sqft covered dining pavilion (rain backup or AC-tent setup option).\n\nKitchen wings are dual — veg and non-veg with separate prep zones (important for Lucknow’s mixed-community weddings). In-house catering by Awadhi Royal Caterers offers galouti kebab, tunday kebab counters, biryani by the matka. Security gate with metal detectors deployable on request (popular for political and high-profile events). Generator backup for the entire venue. Boat-shaped photo zone overlooking Gomti is a guest favourite. Parking for 120 cars + 200 bikes on adjacent ground.',
    tags: ['Wedding', 'Riverfront', 'Awadhi Cuisine', 'Food Festival', 'Large Capacity'],
    location: {
      address: 'Gomti Riverfront, Hazratganj Extension Road',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001',
    },
    area: 25000,
    areaUnit: 'sqft',
    boundarySize: 'Lawn + dining pavilion + photo deck',
    capacity: 500,
    photos: [...GOMTI_LUCKNOW],
    eventDetails: {
      seatedCapacity: 380,
      standingCapacity: 500,
      minGuests: 120,
      rooms: 4,
      washrooms: 14,
      dressingRooms: 3,
      parkingSpaces: 120,
      cateringAvailable: true,
    },
    pricing: { eventBased: 165000, daily: 245000, halfDay: 115000 },
    reviews: [
      { authorName: 'Lucknow Wedding Planners LLP', rating: 5, comment: 'Coordinated 8 weddings here in 2024 across 200-450 guest sizes. Venue scales beautifully — large lawn doesn’t feel empty for 200, doesn’t feel cramped at 450. Awadhi catering is genuinely the best in Lucknow.', visitType: 'Wedding planner regular' },
      { authorName: 'Awadh Food Fest Organiser', rating: 5, comment: 'Hosted 3-day Awadhi Food Festival for 12 vendors and 8000+ visitors. Power load for tandoors and degs handled flawlessly. Riverside ambience pulled families in droves.', visitType: 'Food festival' },
      { authorName: 'Meera & Akhilesh Singh', rating: 4, comment: 'Our 380-guest baraat reception. Photo deck with Gomti backdrop made our highlights reel. Summer evenings (April-June) get warm — book the AC pavilion option.', visitType: 'Wedding reception' },
    ],
  },
  {
    name: 'Cyber Hub Pavilion — Gurugram',
    tagline: 'Premium indoor banquet for corporate galas & weddings, 5 min from Cyber Hub.',
    description:
      'A 12,000-sqft fully air-conditioned banquet pavilion in Sector 24 Gurugram, walking distance from DLF Cyber Hub. The venue is the chosen evening event space for Gurugram’s corporate elite — annual gala dinners, sales kickoffs, leadership offsites, and high-end weddings.\n\nThe pavilion features customisable lighting (16 RGBW zones), an automated 4K projection system with 24-ft retractable screen, premium Bose acoustic setup, and a built-in stage with retractable backdrops. In-house catering by Crystal Banquets offers North Indian, Mughlai, Continental, and pan-Asian live counters. Premium vegetarian Jain menu also available. Valet parking for 100 cars under the building, 80 more in a 2-min walk. Power backup is 500 KVA — never had a single AC trip in 4 years of operation. Booked regularly by Google, KPMG, EY and Microsoft Gurugram for year-end events.',
    tags: ['Corporate Gala', 'Wedding', 'Air-Conditioned', 'Cyber Hub', 'Premium'],
    location: {
      address: 'Sector 24, DLF Phase 3, Near Cyber Hub',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
    },
    area: 12000,
    areaUnit: 'sqft',
    boundarySize: 'AC banquet hall + foyer + 2 anterooms',
    capacity: 280,
    photos: [...CYBER_HUB_GURUGRAM],
    eventDetails: {
      seatedCapacity: 240,
      standingCapacity: 280,
      minGuests: 60,
      rooms: 3,
      washrooms: 10,
      dressingRooms: 2,
      parkingSpaces: 100,
      cateringAvailable: true,
    },
    pricing: { eventBased: 225000, daily: 345000, halfDay: 155000 },
    reviews: [
      { authorName: 'KPMG Gurugram HR', rating: 5, comment: 'Annual partners’ dinner for 220 senior leaders. Lighting transitions during the awards segment were professionally executed, and Crystal Banquets’ pan-Asian live counter was the highlight. AC handled the December crowd perfectly.', visitType: 'Annual partners dinner' },
      { authorName: 'Ravina & Manish — Wedding', rating: 4, comment: '180-guest engagement evening. Venue felt premium and the customisable lighting let our decor team create three different moods during the night. Slightly above market premium but service justified it.', visitType: 'Engagement ceremony' },
      { authorName: 'Google Gurugram Events', rating: 5, comment: 'Used for our APAC sales kickoff — 200 attendees, full-day with 3 sessions and a gala dinner. AV stack is genuinely Tier-1, our keynote ran 4K without a hitch.', visitType: 'Sales kickoff' },
    ],
  },
  {
    name: 'Riverside Birthday Garden — Andheri, Mumbai',
    tagline: 'Intimate garden venue for birthdays, anniversaries & private parties.',
    description:
      'A charming 6,000-sqft garden venue in Andheri West, designed specifically for milestone birthdays (1st birthday, 25th, 50th, 60th), anniversaries, baby showers, and private cocktail evenings under 80 guests. The garden features a kids’ play zone with soft-floor mats, a small stage for cake-cutting and toast moments, ambient bistro lighting, and dedicated photography spots (balloon arch zone, floral wall, vintage car prop area).\n\nIn-house theme packages include Bollywood retro, Pastel garden, Tropical luau, and Mumbai-meri-jaan retro themes (starting ₹15k). Catering panel includes Mumbai favourites like 1441 Pizzeria, Tibb’s Frankie counter, and dessert station by Theobroma. The venue is licensed for music till 10 PM (Andheri zone). Photographer and videographer recommendations on tap. Valet parking for 30 cars + plenty of bike space. A favourite for influencer photo shoots too — flat ₹10k for 3-hour photo-only rental.',
    tags: ['Birthday Party', 'Anniversary', 'Baby Shower', 'Andheri', 'Themed Decor'],
    location: {
      address: 'Lokhandwala Complex, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
    },
    area: 6000,
    areaUnit: 'sqft',
    boundarySize: 'Garden + play zone + stage + photo spots',
    capacity: 80,
    photos: [...RIVERSIDE_BIRTHDAY_ANDHERI],
    eventDetails: {
      seatedCapacity: 60,
      standingCapacity: 80,
      minGuests: 20,
      rooms: 1,
      washrooms: 4,
      dressingRooms: 1,
      parkingSpaces: 30,
      cateringAvailable: true,
    },
    pricing: { eventBased: 55000, daily: 85000, halfDay: 35000 },
    reviews: [
      { authorName: 'Priyanka Shetty', rating: 5, comment: 'My daughter’s 1st birthday — Tropical luau theme, 45 guests including 12 toddlers. The play zone kept kids occupied while parents ate. Theobroma dessert station was a hit. Highly recommend.', visitType: '1st birthday' },
      { authorName: 'Rohan & Anjali', rating: 5, comment: 'Surprise 50th for my mom — Bollywood retro theme with a vintage car prop. Mom literally cried happy tears. Venue team coordinated the surprise entry with our music cue. Pure professionalism.', visitType: '50th birthday surprise' },
      { authorName: 'Sneha Iyer', rating: 4, comment: 'Baby shower for 50 — pastel theme, brunch format 11 AM-3 PM. Half-day pricing of ₹35k was very fair for Andheri West. Garden gets warm by 1 PM in summer, plan some shade tents.', visitType: 'Baby shower' },
    ],
  },
];

export function getSportsVenues() {
  return SPORTS_VENUES.map((v) =>
    withReviews({
      ...v,
      groundType: 'sports',
      rules:
        v.rules ||
        'Non-marking sports shoes mandatory. No smoking on playing surface. No outside alcohol. Equipment damage chargeable as per actuals.',
    })
  );
}

export function getEventVenues() {
  return EVENT_VENUES.map((v) =>
    withReviews({
      ...v,
      groundType: 'event',
      rules:
        v.rules ||
        'Music curfew per local police norms (typically 10 PM). Outside catering allowed with prior FSSAI approval. Decor changes requiring drilling not permitted. Security deposit refundable after walkthrough.',
    })
  );
}

export function getAllVenueNames() {
  return [...SPORTS_VENUES, ...EVENT_VENUES].map((v) => v.name);
}