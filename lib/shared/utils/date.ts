import { 
  differenceInDays as dateFnsDifferenceInDays,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  format as dateFnsFormat,
  isWithinInterval as dateFnsIsWithinInterval,
  addDays as dateFnsAddDays,
  subDays as dateFnsSubDays,
  parseISO,
  startOfDay
} from 'date-fns';

/**
 * Calculate the difference in days between two dates
 * @param endDate - End date (ISO string or Date)
 * @param startDate - Start date (ISO string or Date)
 * @returns Number of days between dates
 */
export function differenceInDays(endDate: string | Date, startDate: string | Date): number {
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  return dateFnsDifferenceInDays(end, start);
}

/**
 * Generate an array of all days between start and end (inclusive)
 * @param start - Start date (ISO string or Date)
 * @param end - End date (ISO string or Date)
 * @returns Array of Date objects for each day
 */
export function eachDayOfInterval(start: string | Date, end: string | Date): Date[] {
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;
  return dateFnsEachDayOfInterval({ start: startDate, end: endDate });
}

/**
 * Format a date to string
 * @param date - Date to format (ISO string or Date)
 * @param formatString - Format pattern (e.g., 'yyyy-MM-dd', 'MMM d')
 * @returns Formatted date string
 */
export function format(date: string | Date, formatString: string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsFormat(d, formatString);
}

/**
 * Check if a date is within an interval
 * @param date - Date to check (ISO string or Date)
 * @param interval - Interval with start and end
 * @returns True if date is within interval
 */
export function isWithinInterval(
  date: string | Date,
  interval: { start: string | Date; end: string | Date }
): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  const start = typeof interval.start === 'string' ? parseISO(interval.start) : interval.start;
  const end = typeof interval.end === 'string' ? parseISO(interval.end) : interval.end;
  return dateFnsIsWithinInterval(d, { start, end });
}

/**
 * Add days to a date
 * @param date - Base date (ISO string or Date)
 * @param amount - Number of days to add
 * @returns New date with days added
 */
export function addDays(date: string | Date, amount: number): Date {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsAddDays(d, amount);
}

/**
 * Subtract days from a date
 * @param date - Base date (ISO string or Date)
 * @param amount - Number of days to subtract
 * @returns New date with days subtracted
 */
export function subDays(date: string | Date, amount: number): Date {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsSubDays(d, amount);
}

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 * @returns Today's date in ISO format
 */
export function getTodayISO(): string {
  return format(startOfDay(new Date()), 'yyyy-MM-dd');
}

/**
 * Parse ISO date string to Date object
 * @param dateString - ISO date string (YYYY-MM-DD or full ISO timestamp)
 * @returns Date object
 */
export function parseISODate(dateString: string): Date {
  return parseISO(dateString);
}

/**
 * Convert Date to ISO date string (YYYY-MM-DD)
 * @param date - Date object
 * @returns ISO date string
 */
export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
