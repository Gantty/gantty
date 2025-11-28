'use client';

import React from 'react';
import { Event, Group } from '../usecase/types';
import { differenceInDays } from '@/lib/shared/utils/date';
import EventBar from './event-bar';

interface TimelineGridProps {
  events: Event[];
  groups: Group[];
  startDate: string;
  endDate: string;
  totalDays: number;
  onSelectEvent: (event: Event) => void;
}

export default function TimelineGrid({
  events,
  groups,
  startDate,
  endDate,
  totalDays,
  onSelectEvent
}: TimelineGridProps) {
  // Create a map of groups for quick lookup
  const groupMap = new Map(groups.map(g => [g.id, g]));

  return (
    <div className="flex flex-col">
      {events.map((event) => {
        const group = groupMap.get(event.groupId);
        const color = group?.color || '#9CA3AF';

        // Calculate grid position
        const startOffset = differenceInDays(event.startDate, startDate);
        const duration = differenceInDays(event.endDate, event.startDate) + 1;

        return (
          <div
            key={event.id}
            className="relative border-b border-gray-200"
            style={{ minHeight: '48px' }}
          >
            {/* Day grid cells */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: totalDays }, (_, i) => (
                <div
                  key={i}
                  className="border-r border-gray-100 min-w-[80px]"
                />
              ))}
            </div>

            {/* Event bar */}
            <EventBar
              event={event}
              color={color}
              startOffset={startOffset}
              duration={duration}
              onClick={() => onSelectEvent(event)}
            />
          </div>
        );
      })}

      {events.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          No events to display
        </div>
      )}
    </div>
  );
}
