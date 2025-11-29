'use client';

import { create } from 'zustand';
import { Event, FocusPeriod } from '../usecase/types';
import { CalculateTimelineUsecase } from '../usecase/calculate_timeline_usecase';

const calculateTimelineUsecase = new CalculateTimelineUsecase();

export type ViewMode = 'day' | 'week' | 'month';

interface TimelineStoreState {
  // State
  visibleStart: string;
  visibleEnd: string;
  totalDays: number;
  focusPeriod: FocusPeriod | null;
  viewMode: ViewMode;
  dayWidth: number;

  // Actions
  calculateFromEvents: (events: Event[]) => void;
  setTimelineRange: (start: string, end: string) => void;
  panTimeline: (days: number) => void;
  showAll: (events: Event[]) => void;
  setFocusPeriod: (period: FocusPeriod | null) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useTimelineStore = create<TimelineStoreState>((set, get) => ({
  // Initial state - default to today ± 7 days
  visibleStart: '',
  visibleEnd: '',
  totalDays: 0,
  focusPeriod: null,

  // Actions
  calculateFromEvents: (events: Event[]) => {
    const range = calculateTimelineUsecase.execute(events);
    set({
      visibleStart: range.startDate,
      visibleEnd: range.endDate,
      totalDays: range.totalDays
    });
  },

  setTimelineRange: (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    set({
      visibleStart: start,
      visibleEnd: end,
      totalDays
    });
  },

  panTimeline: (days: number) => {
    const { visibleStart, visibleEnd } = get();
    const startDate = new Date(visibleStart);
    const endDate = new Date(visibleEnd);

    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() + days);

    set({
      visibleStart: startDate.toISOString().split('T')[0],
      visibleEnd: endDate.toISOString().split('T')[0]
    });
  },

  showAll: (events: Event[]) => {
    const range = calculateTimelineUsecase.execute(events);
    set({
      visibleStart: range.startDate,
      visibleEnd: range.endDate,
      totalDays: range.totalDays
    });
  },

  setFocusPeriod: (period: FocusPeriod | null) => {
    set({ focusPeriod: period });
  },

  viewMode: 'day',
  dayWidth: 80,

  setViewMode: (mode: 'day' | 'week' | 'month') => {
    let dayWidth = 80;
    switch (mode) {
      case 'week':
        dayWidth = 20;
        break;
      case 'month':
        dayWidth = 5;
        break;
      default:
        dayWidth = 80;
    }
    set({ viewMode: mode, dayWidth });
  }
}));
