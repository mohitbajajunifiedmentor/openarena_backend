export function timeToMinutes(time) {
  if (!time || typeof time !== 'string') return 0;
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** True if [aStart,aEnd) overlaps [bStart,bEnd) */
export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

export function normalizeDateOnly(dateInput) {
  const d = new Date(dateInput);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function dateKey(d) {
  const x = normalizeDateOnly(d);
  return x.toISOString().slice(0, 10);
}

export function getDayOfWeek(dateInput) {
  return normalizeDateOnly(dateInput).getDay();
}

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export function getDayName(dateInput) {
  return DAY_NAMES[getDayOfWeek(dateInput)];
}

export function isValidTimeRange(startTime, endTime) {
  return timeToMinutes(endTime) > timeToMinutes(startTime);
}
