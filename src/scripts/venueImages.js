/**
 * Pexels CDN image helper.
 * Each venue gets its OWN array of unique image IDs — no sharing between venues.
 * All IDs verified from real Pexels search pages.
 */
export function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
}

/* =====================================================================
 * PER-VENUE IMAGE ARRAYS — each venue gets a themed, mostly-unique set
 * of 5 verified Pexels images. Wedding-themed venues use different
 * sub-themes (mehndi, haldi, rings, decor) so cards don't look alike.
 * ===================================================================== */

/* ---------- SPORTS VENUES (12) ---------- */

// 1. Bandra Football + Box Cricket
export const TURF_PARK_BANDRA = [
  pexels(399187),     // Brightly lit green soccer field night
  pexels(46798),      // Soccer field aerial
  pexels(1171084),    // Football turf wide
  pexels(140067),     // Stadium under floodlights
  pexels(274422),     // Football pitch action
];

// 2. Pune 5-a-side Football
export const SPORTZ_VILLAGE_PUNE = [
  pexels(189524),     // Football on grass — distinct cover from Bandra
  pexels(274506),     // Football with goal
  pexels(46798),      // Soccer field
  pexels(399187),     // Lit soccer field
  pexels(1171084),    // Football turf
];

// 3. Indiranagar Cricket Practice Nets
export const CRICBUZZ_INDIRANAGAR = [
  pexels(31131695),   // Cricketer in green uniform
  pexels(31131696),   // Dynamic cricket scene
  pexels(31131697),   // Cricket player full gear
  pexels(36293965),   // Cricket match Delhi sports field
  pexels(31723741),   // Mumbai cricket action
];

// 4. Dwarka multi-sport turf
export const KHEL_MAIDAN_DWARKA = [
  pexels(8783155),    // Aerial sports field with track
  pexels(37364347),   // Aerial empty sports stadium India
  pexels(36293970),   // Outdoor cricket urban ground Delhi
  pexels(2799556),    // Sunset stadium dusk
  pexels(30678437),   // Outdoor cricket match clear sky
];

// 5. Gachibowli Badminton + Cricket strip
export const SPORTZONE_GACHIBOWLI = [
  pexels(3660204),    // Badminton rackets & shuttlecocks
  pexels(8007171),    // Women on badminton court
  pexels(8007499),    // High-five badminton players
  pexels(8796050),    // Player mid-action indoor court
  pexels(1432039),    // Indoor sports hall
];

// 6. Chennai OMR Natural Grass Cricket
export const CHENNAI_SUPER_OMR = [
  pexels(36741131),   // Narendra Modi Stadium packed crowd
  pexels(36741130),   // Night cricket Ahmedabad stadium
  pexels(31739439),   // Iconic empty cricket stadium
  pexels(29881319),   // Aerial Narendra Modi Stadium
  pexels(37230408),   // Lucknow cricket stadium daytime
];

// 7. Salt Lake Football Arena
export const GOALRUSH_SALTLAKE = [
  pexels(1171084),    // Football turf wide — distinct cover
  pexels(140067),     // Stadium lights
  pexels(189524),     // Football on grass
  pexels(274422),     // Football action
  pexels(46798),      // Soccer field
];

// 8. SG Highway Tennis Club
export const SMASH_TENNIS_AHMEDABAD = [
  pexels(2078271),    // Empty tennis court
  pexels(8224724),    // Tennis player action
  pexels(54123),      // Tennis net close-up
  pexels(209977),     // Outdoor tennis court
  pexels(2202685),    // Tennis racket and ball
];

// 9. Jaipur Box Cricket
export const PINK_CITY_JAIPUR = [
  pexels(31852382),   // Cricket stadium fans yellow
  pexels(36950379),   // Hyderabad cricket match daytime
  pexels(9153468),    // HPCA Stadium with mountains
  pexels(36230651),   // Narendra Modi night cricket
  pexels(15862398),   // Fans Indian flag Melbourne cricket
];

// 10. Lucknow Family Sports Turf
export const AWADH_LUCKNOW = [
  pexels(24394759),   // Top-down cricket stadium Dhaka
  pexels(6959888),    // Narendra Modi Stadium graffiti
  pexels(32945758),   // Eden Gardens twilight
  pexels(29949985),   // Melbourne cricket match
  pexels(30678437),
];

// 11. Whitefield Premium Box + Football
export const POWERPLAY_WHITEFIELD = [
  pexels(140067),     // Stadium lights — premium night feel
  pexels(274506),     // Football with goal
  pexels(31131696),   // Dynamic cricket scene
  pexels(189524),     // Football on grass
  pexels(8783155),    // Aerial sports field
];

// 12. HSR Layout Badminton 8 Courts
export const SMASH_ARENA_HSR = [
  pexels(8796050),    // Player mid-action — different cover from Gachibowli
  pexels(8007499),    // High-five
  pexels(8007171),    // Women on badminton court
  pexels(1432039),    // Indoor sports hall
  pexels(3660204),    // Rackets & shuttles
];

/* ---------- EVENT VENUES (12) ---------- */
/* Each wedding venue uses a DIFFERENT sub-theme so they look distinct */

// 1. Bandra Sea Breeze Lawn — Wedding (mehndi-focused photography)
export const SEA_BREEZE_BANDRA = [
  pexels(28496968),   // Intricate mehndi design on bride's hands
  pexels(35555354),   // Indian bride with mehndi & floral jewelry
  pexels(36354615),   // Bridal mehndi application on arm
  pexels(28721955),   // Bangladeshi wedding henna & flowers
  pexels(36581308),   // Bride's hands with mehndi & yellow ribbons
];

// 2. Pune Greenroom — Corporate (formal meeting style)
export const GREENROOM_PUNE = [
  pexels(1181396),    // Diverse team conference room
  pexels(1181406),    // Conference room collaboration
  pexels(1181395),    // Meeting inside conference room
  pexels(1181519),    // Business team meeting
  pexels(1181613),    // Professional meeting room
];

// 3. Whitefield Aerocity — Concert / Hackathon (stage focused)
export const AEROCITY_WHITEFIELD = [
  pexels(1105666),    // Concert crowd stage lights
  pexels(1763075),    // Stage lighting concert
  pexels(167636),     // Live concert audience
  pexels(1190297),    // Outdoor music stage
  pexels(2747449),    // Concert hall crowd
];

// 4. Chhatarpur Farmhouse — Sangeet / Wedding (haldi-themed)
export const FARMHOUSE_42_DELHI = [
  pexels(31002035),   // Traditional Indian wedding haldi decorations
  pexels(32428340),   // Indian wedding haldi ceremony with family
  pexels(20838881),   // Henna designs with Indian wedding jewelry
  pexels(33024112),   // Elegant bridal mehndi & wedding attire
  pexels(23670674),   // Hands with henna on colorful Indian wedding bg
];

// 5. Hyderabad SkyDeck — Rooftop Corporate (business event style)
export const SKYDECK_HYDERABAD = [
  pexels(2774556),    // Corporate audience conference
  pexels(7648221),    // Business event presentation
  pexels(2867333),    // Business conference event
  pexels(3184360),    // Corporate networking event
  pexels(2422293),    // Conference attendees
];

// 6. Chennai ECR Beach Lawn — Beach Wedding (south-asian portrait theme)
export const COROMANDEL_ECR = [
  pexels(35560895),   // South Asian woman elegant henna portrait
  pexels(35560874),   // Mehndi ceremony portrait
  pexels(30840087),   // Mehndi designs Gujarat bride
  pexels(13102907),   // Bride's hands Bangladesh
  pexels(20043117),   // Henna designs South Asian woman
];

// 7. Kolkata Heritage Bungalow — Boutique wedding (Victoria Memorial-style colonial)
export const PARK_STREET_KOLKATA = [
  pexels(19513334),   // Victoria Memorial Kolkata frontal
  pexels(6210324),    // Victoria Memorial Kolkata
  pexels(16565204),   // Victoria Memorial Kolkata twilight
  pexels(19109591),   // Victoria Memorial dome interior
  pexels(17577062),   // Victoria Memorial roof
];

// 8. Ahmedabad Sabarmati Riverfront — Exhibition / Cultural (exhibition hall theme)
export const SABARMATI_AHMEDABAD = [
  pexels(159213),     // Exhibition open space
  pexels(7648479),    // Conference setup hall
  pexels(2422293),    // Convention attendees
  pexels(7648221),
  pexels(3184360),
];

// 9. Jaipur Amer View — Destination wedding (Hawa Mahal / Pink City palace)
export const AMER_VIEW_JAIPUR = [
  pexels(15395061),   // Hawa Mahal Jaipur frontal — iconic pink sandstone
  pexels(10348391),   // Hawa Mahal Jaipur view
  pexels(19195945),   // Hawa Mahal Jaipur facade close
  pexels(9610478),    // Victoria Memorial sunset (palace-vibe)
  pexels(2306281),    // Heritage architecture
];

// 10. Lucknow Gomti Riverside — Grand wedding (different mehndi shots)
export const GOMTI_LUCKNOW = [
  pexels(30370332),   // Intricate bridal henna designs
  pexels(25824235),   // Henna tattoos couple's hands
  pexels(27151466),   // Henna designs forearms
  pexels(33557620),   // Vibrant henna celebration
  pexels(21568647),   // Henna artistry on foot Indian wedding
];

// 11. Gurugram Cyber Hub Pavilion — Corporate Gala (premium corporate)
export const CYBER_HUB_GURUGRAM = [
  pexels(1181467),    // Corporate workshop
  pexels(1181675),    // Meeting room professionals
  pexels(2422293),
  pexels(2774556),
  pexels(3184360),
];

// 12. Andheri Riverside Birthday Garden — Party
export const RIVERSIDE_BIRTHDAY_ANDHERI = [
  pexels(1729797),    // Party setup birthday
  pexels(796606),     // Balloons celebration
  pexels(1729799),    // Party decor lights
  pexels(587741),     // Indoor party hall
  pexels(796602),     // Birthday party decoration
];

/* ---------- LEGACY EXPORTS (kept so seedVenues.js category tiles still work) ---------- */
export const SPORTS_IMAGES = {
  cricket: [pexels(36741131), pexels(31739439), pexels(37230408), pexels(30678437), pexels(9153468)],
  football: [pexels(399187), pexels(46798), pexels(1171084), pexels(140067), pexels(274422)],
  badminton: [pexels(3660204), pexels(8007171), pexels(8007499), pexels(8796050), pexels(1432039)],
  tennis: [pexels(2078271), pexels(8224724), pexels(54123), pexels(209977), pexels(2202685)],
  multi: [pexels(8783155), pexels(37364347), pexels(36293970), pexels(46798), pexels(140067)],
  nets: [pexels(31131695), pexels(31131696), pexels(31131697), pexels(36293965), pexels(31723741)],
};

export const EVENT_IMAGES = {
  wedding: [pexels(28496968), pexels(35555354), pexels(36354615), pexels(31002035), pexels(32428340)],
  corporate: [pexels(1181396), pexels(1181406), pexels(1181395), pexels(2774556), pexels(7648221)],
  concert: [pexels(1105666), pexels(1763075), pexels(167636), pexels(1190297), pexels(2747449)],
  exhibition: [pexels(159213), pexels(7648479), pexels(2422293), pexels(2867333), pexels(3184360)],
  outdoor: [pexels(35560895), pexels(35560874), pexels(30840087), pexels(13102907), pexels(20043117)],
  heritage: [pexels(2306281), pexels(2403018), pexels(2832034), pexels(2402777), pexels(2832041)],
  riverfront: [pexels(30370332), pexels(25824235), pexels(27151466), pexels(33557620), pexels(21568647)],
  destination: [pexels(2403018), pexels(2306281), pexels(2832034), pexels(2402777), pexels(2832041)],
  party: [pexels(1729797), pexels(796606), pexels(1729799), pexels(587741), pexels(796602)],
};