'use client';

import { format, eachDayOfInterval } from '@/lib/shared/utils/date';

import { ViewMode } from '../presenter/timeline_store';

interface TimelineHeaderProps {
  startDate: string;
  endDate: string;
  viewMode: ViewMode;
  dayWidth: number;
}

export default function TimelineHeader({ startDate, endDate, viewMode, dayWidth }: TimelineHeaderProps) {
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
          const dayOfWeek = format(day, 'EEE');
          const isFirstDayOfMonth = day.getDate() === 1;
          const isMonday = day.getDay() === 1;

          let showLabel = false;
          let label = '';
          let subLabel = '';

          if (viewMode === 'day') {
            showLabel = true;
            label = format(day, 'MMM d');
            subLabel = dayOfWeek;
          } else if (viewMode === 'week') {
            if (isMonday || day.getTime() === days[0].getTime()) {
              showLabel = true;
              label = format(day, 'MMM d');
              subLabel = 'Week ' + format(day, 'w');
            }
          } else if (viewMode === 'month') {
            if (isFirstDayOfMonth || day.getTime() === days[0].getTime()) {
              showLabel = true;
              label = format(day, 'MMMM yyyy');
            }
          }

          return (
            <div
              key={dateStr}
              className={`flex flex-col items-center justify-center border-r border-gray-200 px-1 py-2 box-border ${viewMode === 'month' ? 'border-r-0' : ''
                }`}
              style={{
                width: `${dayWidth}px`,
                minWidth: `${dayWidth}px`,
                borderRightWidth: viewMode === 'month' && isFirstDayOfMonth ? '1px' : '0px'
              }}
            >
              {showLabel && (
                <div className="absolute whitespace-nowrap pl-1">
                  {subLabel && <div className="text-xs text-gray-500 font-medium">{subLabel}</div>}
                  <div className="text-sm font-semibold text-gray-900">{label}</div>
                </div>
              )}
              {viewMode === 'day' && !showLabel && (
                <>
                  <div className="text-xs text-gray-500 font-medium">{dayOfWeek}</div>
                  <div className="text-sm font-semibold text-gray-900">{format(day, 'MMM d')}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
