'use client';

import React from 'react';
import { Event } from '../usecase/types';

interface EventBarProps {
  event: Event;
  color: string;
  startOffset: number;
  duration: number;
  onClick: () => void;
}

const EventBar = React.memo(function EventBar({
  event,
  color,
  startOffset,
  duration,
  onClick
}: EventBarProps) {
  const left = startOffset * 80; // 80px per day
  const width = duration * 80;

  return (
    <div
      className="absolute top-1 bottom-1 rounded-lg px-3 py-1.5 cursor-pointer hover:opacity-90 transition-all hover:shadow-lg border border-opacity-20 border-black"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: color,
        minWidth: '80px'
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
