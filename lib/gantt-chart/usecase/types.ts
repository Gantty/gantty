// Core domain types for Gantt Chart feature

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO 8601 date (YYYY-MM-DD)
  endDate: string;   // ISO 8601 date (YYYY-MM-DD)
  groupId: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

export interface Group {
  id: string;
  name: string;
  color: string; // hex #RRGGBB
  visible: boolean;
  order: number;
  isDefault: boolean;
}

export interface Version {
  id: string;
  number: number;
  createdAt: string;
  note: string;
  snapshot: VersionSnapshot;
}

export interface VersionSnapshot {
  events: Event[];
  groups: Group[];
  settings?: DisplaySettings;
}

export interface DisplaySettings {
  visibleStart: string;
  visibleEnd: string;
  searchKeyword: string;
  focusPeriod: FocusPeriod | null;
}

export interface FocusPeriod {
  start: string; // ISO 8601 date
  end: string;   // ISO 8601 date
}

export interface VersionDiff {
  addedEvents: Event[];
  deletedEvents: Event[];
  modifiedEvents: ModifiedEvent[];
  reorderedEvents: ReorderedEvent[];
  groupChanges: GroupChange[];
}

export interface ModifiedEvent {
  eventId: string;
  oldValue: Event;
  newValue: Event;
  changes: EventChanges;
}

export interface EventChanges {
  name?: FieldChange<string>;
  description?: FieldChange<string>;
  startDate?: FieldChange<string>;
  endDate?: FieldChange<string>;
  groupId?: FieldChange<string>;
}

export interface ReorderedEvent {
  eventId: string;
  fromIndex: number;
  toIndex: number;
  name: string;
}

export interface FieldChange<T> {
  old: T;
  new: T;
}

export interface GroupChange {
  type: 'added' | 'deleted' | 'modified';
  groupId: string;
  oldValue?: Group;
  newValue?: Group;
  changes?: {
    name?: FieldChange<string>;
    color?: FieldChange<string>;
  };
}

// DTOs for creating/updating entities

export interface CreateEventData {
  name: string;
  description: string;
  startDate: string; // ISO 8601 date
  endDate: string;   // ISO 8601 date
  groupId: string;
}

export interface UpdateEventData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  groupId?: string;
}

export interface CreateGroupData {
  name: string;
  color: string; // hex #RRGGBB
  order?: number;
}

export interface UpdateGroupData {
  name?: string;
  color?: string;
  order?: number;
}

export interface CreateVersionData {
  note: string;
  snapshot: VersionSnapshot;
}

// Filter and query types

export interface EventFilter {
  searchKeyword?: string;
  visibleGroupIds?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TimelineRange {
  startDate: string; // Earliest event start - buffer
  endDate: string;   // Latest event end + buffer
  totalDays: number;
}

// Storage types

export interface StorageUsage {
  used: number;      // Bytes used
  available: number; // Bytes available (if known)
  percentage: number; // % of quota used (if known)
}
