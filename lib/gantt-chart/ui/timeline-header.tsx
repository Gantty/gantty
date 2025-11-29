'use client';

import { format, eachDayOfInterval } from '@/lib/shared/utils/date';

interface TimelineHeaderProps {
  startDate: string;
  endDate: string;
}

export default function TimelineHeader({ startDate, endDate }: TimelineHeaderProps) {
  const days = eachDayOfInterval(startDate, endDate);

  return (
    <div className="sticky top-0 z-20 flex bg-white border-b-2 border-gray-200 shadow-sm">
      {/* Corner cell */}
      <div className="sticky left-0 z-30 w-48 border-r-2 border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-900">
        Event
      </div>

      {/* Date columns */}
      <div className="flex bg-white">
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayLabel = format(day, 'MMM d');
          const dayOfWeek = format(day, 'EEE');
          
          return (
            <div
              key={dateStr}
              className="flex flex-col items-center justify-center border-r border-gray-200 px-2 py-2 min-w-[80px]"
            >
              <div className="text-xs text-gray-500 font-medium">{dayOfWeek}</div>
              <div className="text-sm font-semibold text-gray-900">{dayLabel}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
