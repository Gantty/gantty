'use client';

import { create } from 'zustand';
import { Event, CreateEventData, UpdateEventData } from '../usecase/types';
import { CreateEventUsecase } from '../usecase/create_event_usecase';
import { UpdateEventUsecase } from '../usecase/update_event_usecase';
import { DeleteEventUsecase } from '../usecase/delete_event_usecase';
import { eventRepository } from '../repository';

// Use cases
const createEventUsecase = new CreateEventUsecase(eventRepository);
const updateEventUsecase = new UpdateEventUsecase(eventRepository);
const deleteEventUsecase = new DeleteEventUsecase(eventRepository);

interface EventStoreState {
  // State
  events: Event[];
  selectedEvent: Event | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadEvents: () => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  updateEvent: (id: string, data: UpdateEventData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  selectEvent: (event: Event | null) => void;
  clearError: () => void;
}

export const useEventStore = create<EventStoreState>((set, get) => ({
  // Initial state
  events: [],
  selectedEvent: null,
  isLoading: false,
  error: null,

  // Actions
  loadEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const events = await eventRepository.getAll();
      set({ events, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createEvent: async (data: CreateEventData) => {
    set({ isLoading: true, error: null });
    try {
      const event = await createEventUsecase.execute(data);
      set((state) => ({
        events: [...state.events, event],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateEvent: async (id: string, data: UpdateEventData) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateEventUsecase.execute(id, data);
      set((state) => ({
        events: state.events.map((e) => (e.id === id ? updated : e)),
        selectedEvent: state.selectedEvent?.id === id ? updated : state.selectedEvent,
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteEventUsecase.execute(id);
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
        selectedEvent: state.selectedEvent?.id === id ? null : state.selectedEvent,
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  selectEvent: (event: Event | null) => {
    set({ selectedEvent: event });
  },

  clearError: () => {
    set({ error: null });
  }
}));
