import { Event, TimelineRange } from './types';
import { addDays, subDays, differenceInDays, toISODate } from '@/lib/shared/utils/date';

const BUFFER_DAYS = 7; // Days to add before/after for better UX

export class CalculateTimelineUsecase {
  execute(events: Event[]): TimelineRange {
    if (events.length === 0) {
      // Default to today ± 7 days if no events
      const today = new Date();
      const start = toISODate(subDays(today, BUFFER_DAYS));
      const end = toISODate(addDays(today, BUFFER_DAYS));
      return {
        startDate: start,
        endDate: end,
        totalDays: differenceInDays(end, start) + 1
      };
    }

    // Find earliest start and latest end
    let earliestStart = events[0].startDate;
    let latestEnd = events[0].endDate;

    for (const event of events) {
      if (event.startDate < earliestStart) {
        earliestStart = event.startDate;
      }
      if (event.endDate > latestEnd) {
        latestEnd = event.endDate;
      }
    }

    // Add buffer days
    const startDate = toISODate(subDays(earliestStart, BUFFER_DAYS));
    const endDate = toISODate(addDays(latestEnd, BUFFER_DAYS));

    return {
      startDate,
      endDate,
      totalDays: differenceInDays(endDate, startDate) + 1
    };
  }
}
