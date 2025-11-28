# Feature Specification: Gantt Chart Planning Tool (Local Browser Version)

**Feature Branch**: `001-gantt-chart`  
**Created**: 2025-11-29  
**Status**: Draft  
**Input**: User description: "甘特圖工具 – 本機使用版 (Local browser-based Gantt chart planning tool)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View Basic Gantt Chart (Priority: P1) 🎯 MVP

Users need to create events with dates and visualize them on a timeline to understand project scheduling at a glance.

**Why this priority**: Core functionality - without basic event creation and visualization, there is no Gantt chart tool. This is the foundation for all other features.

**Independent Test**: Can be fully tested by creating several events with different start/end dates and groups, then verifying they display correctly on the timeline with proper colors and positioning.

**Acceptance Scenarios**:

1. **Given** the tool is opened for the first time, **When** the user views the page, **Then** they see a Gantt chart with default groups (Frontend, Backend, Design) and an empty event list with a timeline showing today ±7 days
2. **Given** the user clicks "Add Event", **When** they fill in event name "Build Login API", group "Backend", start date "2025-12-01", end date "2025-12-05", **Then** a new event bar appears on the timeline spanning those 5 days in the Backend group color
3. **Given** multiple events exist, **When** the user views the Gantt chart, **Then** each event displays as a horizontal bar with its group color, positioned at the correct dates on the X-axis
4. **Given** events span different time ranges, **When** the chart loads, **Then** the timeline automatically shows the full range from earliest start date to latest end date (plus buffer days)
5. **Given** the user clicks on an event name or bar, **When** the edit form opens, **Then** it displays current values for name, group, dates, and description

---

### User Story 2 - Filter and Search Events (Priority: P2)

Users working on large projects need to focus on specific types of work or find particular events quickly without being overwhelmed by all events.

**Why this priority**: Critical for usability with realistic project sizes. Once users have many events, they need filtering to maintain productivity.

**Independent Test**: Can be tested by creating 20+ events across different groups, then verifying keyword search returns only matching events and group checkboxes correctly show/hide events by group.

**Acceptance Scenarios**:

1. **Given** the Gantt chart has events from Frontend, Backend, and Design groups, **When** the user unchecks "Frontend", **Then** only Backend and Design events display on the chart
2. **Given** the user types "API" in the search box, **When** the search executes, **Then** only events with "API" in the name or description appear
3. **Given** the user has unchecked "Design" and searched for "login", **When** viewing results, **Then** only Frontend and Backend events containing "login" are shown (intersection of both filters)
4. **Given** filters are active, **When** the user clears the search box and rechecks all groups, **Then** all events reappear on the timeline

---

### User Story 3 - Navigate Timeline with Sticky Headers (Priority: P2)

Users need to scroll through large Gantt charts while always knowing which date and which event they're looking at.

**Why this priority**: Essential for usability when viewing projects with many events over long time periods. Without this, users get lost in large charts.

**Independent Test**: Can be tested by creating 50+ events spanning 60+ days, then verifying that when scrolling vertically, date headers stay visible, and when scrolling horizontally, event names stay visible.

**Acceptance Scenarios**:

1. **Given** the Gantt chart has 30+ events, **When** the user scrolls down the event list, **Then** the date header row remains fixed at the top of the chart
2. **Given** the timeline spans 60+ days, **When** the user scrolls horizontally to view future dates, **Then** the event name column remains fixed on the left side
3. **Given** the user scrolls both vertically and horizontally, **When** viewing any position in the chart, **Then** both the date header and event names remain visible
4. **Given** a current date vertical line is shown, **When** the user scrolls horizontally, **Then** the "today" line moves with the timeline while headers remain sticky

---

### User Story 4 - Visual Time Indicators (Priority: P3)

Users need visual cues to quickly identify today's date and gauge time intervals without counting individual days.

**Why this priority**: Improves chart readability and time awareness, but the chart is functional without it. Can be added after core features.

**Independent Test**: Can be tested by verifying a distinct vertical line appears at today's date, and lighter vertical lines appear every 5 days starting from the timeline's start date.

**Acceptance Scenarios**:

1. **Given** the timeline includes today's date, **When** the chart renders, **Then** a prominent vertical line appears at today's date column spanning all events
2. **Given** the timeline starts on 2025-01-01, **When** the chart renders, **Then** lighter vertical guide lines appear on 2025-01-06, 2025-01-11, 2025-01-16, etc. (every 5 days)
3. **Given** the user scrolls the timeline, **When** viewing different date ranges, **Then** the current date line and 5-day interval lines remain correctly positioned relative to dates
4. **Given** the current date is outside the visible timeline range, **When** viewing the chart, **Then** the current date line is not displayed (no error occurs)

---

### User Story 5 - Highlight Focus Time Period (Priority: P3)

Users need to visually emphasize a specific time period of interest while still seeing the full project context.

**Why this priority**: Valuable for focusing attention during planning sessions, but the tool works without it. Lower priority than basic filtering.

**Independent Test**: Can be tested by setting a focus period (e.g., 2025-02-10 to 2025-02-20), then verifying that time range has distinct visual highlighting while all events remain visible.

**Acceptance Scenarios**:

1. **Given** the user sets a focus period from 2025-02-10 to 2025-02-20, **When** the chart renders, **Then** that date range has a distinct visual highlight (brighter background or semi-transparent mask on other areas)
2. **Given** a focus period is active, **When** viewing events, **Then** all events remain visible regardless of whether they fall within the focus period
3. **Given** the user clears the focus period, **When** the chart updates, **Then** the timeline returns to normal appearance without any highlighted region
4. **Given** a focus period is set, **When** the user also applies group filters or keyword search, **Then** both the focus highlight and the event filtering work together correctly

---

### User Story 6 - Version History and Comparison (Priority: P2)

Users iterating on project schedules need to save snapshots of their planning and see what changed between versions to track decision history.

**Why this priority**: Core value proposition that differentiates this tool. Users explicitly care about tracking schedule changes. Should be available early.

**Independent Test**: Can be tested by creating a chart, saving version V1, making changes (add/delete/modify events), saving V2, then comparing and verifying the diff report accurately shows all changes.

**Acceptance Scenarios**:

1. **Given** the user has made changes to the Gantt chart, **When** they click "Save Version" and enter note "Initial schedule", **Then** version V1 is created with a snapshot of all current events, groups, and settings
2. **Given** version V1 exists, **When** the user adds 2 events, deletes 1 event, and modifies 1 event's dates, then saves as V2, **Then** both versions appear in the version history list with their notes and timestamps
3. **Given** versions V1 and V2 exist, **When** the user selects both and clicks "Compare Versions", **Then** a diff report shows: added events (2), deleted events (1), and modified events (1) with before/after values
4. **Given** the diff report is displayed, **When** reviewing modifications, **Then** for each modified event, the report clearly shows which fields changed (name, group, start date, end date, description) with old and new values
5. **Given** a version was saved, **When** the user opens the version list, **Then** each version displays its number, creation timestamp, and user-entered note

---

### User Story 7 - Manage Groups (Priority: P3)

Users need to organize events into categories that make sense for their project structure, beyond the default Frontend/Backend/Design groups.

**Why this priority**: Useful for customization, but default groups are sufficient for MVP. Can be added later as project needs vary.

**Independent Test**: Can be tested by adding a new group "QA Testing" with a specific color, creating events in that group, and verifying they display with the correct color and can be filtered.

**Acceptance Scenarios**:

1. **Given** the user clicks "Manage Groups", **When** they add a new group named "QA Testing" with green color, **Then** the group appears in the group filter list and is available when creating events
2. **Given** a custom group exists, **When** the user edits the group to change its name to "Quality Assurance" and color to blue, **Then** all existing events in that group update to show the new name and color
3. **Given** a group has existing events, **When** the user attempts to delete the group, **Then** the system requires the user to first reassign those events to another group or delete them
4. **Given** multiple custom groups exist, **When** viewing the Gantt chart, **Then** each group's events display in their assigned colors and can be filtered independently

### Edge Cases

- What happens when an event's end date is set before its start date? System must validate and prevent this, showing an error message.
- What happens when the user tries to save a version with no events? System allows this (empty state is valid) and the version comparison will show all subsequent additions.
- What happens when deleting all events? The timeline still displays with default date range (today ±7 days) and the chart is empty.
- What happens when two versions are identical? The diff report shows "No changes detected between these versions."
- What happens when the browser storage is full? System should detect and notify the user that save operations may fail.
- What happens when the user has 1000+ events? Performance must remain acceptable (see non-functional requirements).

## Requirements *(mandatory)*

### Functional Requirements

#### Event Management
- **FR-001**: System MUST allow users to create events with name (required), group (required), start date (required), end date (required), and description (optional)
- **FR-002**: System MUST validate that end date is not before start date
- **FR-003**: System MUST allow users to edit existing events, updating any of their properties
- **FR-004**: System MUST allow users to delete events with a confirmation prompt to prevent accidental deletion
- **FR-005**: System MUST display events as horizontal bars on the timeline, positioned according to their start and end dates

#### Group Management
- **FR-006**: System MUST provide default groups (Frontend, Backend, Design) on first use
- **FR-007**: System MUST associate each event with exactly one group
- **FR-008**: System MUST display events with their group's assigned color
- **FR-009**: System MUST allow users to create custom groups with name and color
- **FR-010**: System MUST allow users to edit group names and colors
- **FR-011**: System MUST prevent deletion of groups that have associated events until events are reassigned or deleted

#### Filtering and Search
- **FR-012**: System MUST allow users to show/hide events by toggling group checkboxes
- **FR-013**: System MUST provide a keyword search that filters events by name or description
- **FR-014**: System MUST apply group filters and keyword search as an intersection (both conditions must be met)
- **FR-015**: System MUST update the chart display in real-time as filters change

#### Timeline Display
- **FR-016**: System MUST display time on the X-axis with day-level granularity
- **FR-017**: System MUST display events on the Y-axis as individual rows
- **FR-018**: System MUST automatically calculate and display the full date range spanning all events (plus buffer)
- **FR-019**: System MUST allow users to manually adjust the visible date range (pan left/right)
- **FR-020**: System MUST provide a "Show All" function to reset view to the full event date range

#### Sticky Headers
- **FR-021**: System MUST keep the date header row fixed at the top when scrolling vertically through events
- **FR-022**: System MUST keep the event name column fixed on the left when scrolling horizontally through dates
- **FR-023**: System MUST support simultaneous vertical and horizontal scrolling with both headers remaining fixed

#### Visual Indicators
- **FR-024**: System MUST display a prominent vertical line at today's date when today is within the visible range
- **FR-025**: System MUST display lighter vertical guide lines every 5 days starting from the timeline start date
- **FR-026**: System MUST allow users to set a focus time period (start and end date)
- **FR-027**: System MUST visually highlight the focus time period with distinct styling while keeping all events visible
- **FR-028**: System MUST allow users to clear the focus time period

#### Version Management
- **FR-029**: System MUST allow users to save the current chart state as a numbered version (V1, V2, V3, etc.)
- **FR-030**: System MUST record version number, creation timestamp, and optional user note for each version
- **FR-031**: System MUST store complete snapshots including all events, groups, and optionally display settings
- **FR-032**: System MUST display a version history list showing all saved versions with their metadata
- **FR-033**: System MUST allow users to select two versions and generate a comparison report

#### Version Comparison
- **FR-034**: System MUST identify added events (present in newer version, absent in older version)
- **FR-035**: System MUST identify deleted events (present in older version, absent in newer version)
- **FR-036**: System MUST identify modified events (present in both versions but with different properties)
- **FR-037**: System MUST show which properties changed for modified events (name, group, start date, end date, description)
- **FR-038**: System MUST display before and after values for all changed properties
- **FR-039**: System MUST identify changes in groups (added, deleted, renamed, recolored)
- **FR-040**: System MUST present the diff report as a clear text-based list of changes

#### Data Persistence
- **FR-041**: System MUST store all data (events, groups, versions) in browser local storage
- **FR-042**: System MUST restore previously saved data when reopening the tool
- **FR-043**: System MUST initialize with default groups and empty event list on first use
- **FR-044**: System MUST persist filter states and view settings across sessions

### Key Entities

- **Group**: Represents a category of work (e.g., Frontend, Backend, Design)
  - Attributes: name, color, visibility (checked/unchecked for filtering)
  - Relationship: One group has many events

- **Event**: Represents a task or work item on the timeline
  - Attributes: name, description, start date, end date, group reference
  - Relationship: Each event belongs to exactly one group

- **Version**: Represents a snapshot of the entire chart at a point in time
  - Attributes: version number, creation timestamp, user note, snapshot data (events and groups)
  - Relationship: Independent snapshots, compared pairwise

- **Display Settings**: Current view configuration
  - Attributes: visible date range (start, end), focus period (start, end), active keyword search, group visibility states
  - Relationship: Single active state that determines what user sees

- **Version Diff**: Computed comparison between two versions
  - Attributes: added events list, deleted events list, modified events list (with change details), group changes
  - Relationship: Derived from comparing two version snapshots

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Usability
- **SC-001**: Users can create their first event and see it on the timeline within 30 seconds of opening the tool
- **SC-002**: Users can locate a specific event among 50+ events using search or filters in under 10 seconds
- **SC-003**: Users can understand what changed between two versions in under 60 seconds by reading the diff report

#### Performance
- **SC-004**: Chart displays and updates within 1 second when managing up to 200 events
- **SC-005**: Scrolling (vertical and horizontal) maintains 30+ fps smoothness with 100+ events displayed
- **SC-006**: Filter and search operations return results within 0.5 seconds for datasets up to 500 events

#### Data Integrity
- **SC-007**: Zero data loss during normal browser usage (data persists across browser restarts)
- **SC-008**: Version snapshots capture 100% of chart state (all events and groups) at save time
- **SC-009**: Version comparison detects all differences between snapshots with 100% accuracy

#### Functional Completeness
- **SC-010**: Users can complete a full planning workflow (create events → filter/search → save version → modify → save version → compare) without errors
- **SC-011**: Sticky headers function correctly during any combination of vertical and horizontal scrolling
- **SC-012**: All visual indicators (current date line, 5-day guides, focus period highlight) display accurately relative to their configured dates

#### Offline Capability
- **SC-013**: Tool remains 100% functional without network connectivity
- **SC-014**: No error messages or failed operations due to lack of internet connection

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
