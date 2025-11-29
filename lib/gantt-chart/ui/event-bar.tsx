'use client';

import React from 'react';
import { Event } from '../usecase/types';

interface EventBarProps {
  event: Event;
  color: string;
  startOffset: number;
  duration: number;
  onClick: () => void;
  dayWidth: number;
}

const EventBar = React.memo(function EventBar({
  event,
  color,
  startOffset,
  duration,
  onClick,
  dayWidth
}: EventBarProps) {
  const left = startOffset * dayWidth;
  const width = duration * dayWidth;

  return (
    <div
      className="absolute top-1 bottom-1 rounded-lg px-3 py-1.5 cursor-pointer hover:opacity-90 transition-all hover:shadow-lg border border-opacity-20 border-black"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: color,
        minWidth: `${dayWidth}px`
      }}
      onClick={onClick}
    >
      <div className="text-white text-xs font-semibold truncate drop-shadow-sm">
        {event.name}
      </div>
    </div>
  );
});

export default EventBar;
