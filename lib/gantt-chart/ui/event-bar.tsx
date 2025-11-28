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
      className="absolute top-1 bottom-1 rounded px-2 py-1 cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: color,
        minWidth: '80px'
      }}
      onClick={onClick}
    >
      <div className="text-white text-xs font-medium truncate">
        {event.name}
      </div>
    </div>
  );
});

export default EventBar;
