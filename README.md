# Gantt Chart Planning Tool

A local browser-based Gantt chart tool for project planning and schedule tracking built with Next.js, TypeScript, and Clean Architecture.

## 🎯 Features Implemented (MVP - Phase 3 Complete)

### ✅ User Story 1: Create and View Basic Gantt Chart (P1)

Users can create events with dates and visualize them on a timeline to understand project scheduling at a glance.

**Key Features:**
- Create, edit, and delete events (tasks)
- Assign events to groups (Frontend, Backend, Design)
- Visual timeline with day-level granularity
- Sticky headers (dates stay at top, event names stay at left)
- Color-coded events by group
- Scrollable timeline view
- 100% offline capability with localStorage persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/gantt](http://localhost:3000/gantt) in your browser.

## 📦 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Date Utilities**: date-fns
- **Storage**: localStorage (100% offline)
- **Architecture**: Clean Architecture

## 🎨 Usage

### Creating an Event

1. Click "Add Event" button
2. Fill in name, group, start/end dates, and optional description
3. Click "Save"

### Editing/Deleting

- Click on event name or event bar to edit
- Use "Delete" button in edit modal to remove

## 🏗️ Architecture

Clean Architecture with layer separation:
- **UI Layer**: React components (`lib/gantt-chart/ui/`)
- **Presenter Layer**: Zustand stores (`lib/gantt-chart/presenter/`)
- **Use Case Layer**: Business logic (`lib/gantt-chart/usecase/`)
- **Repository Layer**: Data access (`lib/gantt-chart/repository/`)
- **External Layer**: localStorage (`lib/gantt-chart/external/`)

See `specs/001-gantt-chart/` for detailed documentation.

## 📋 Roadmap

**✅ Phase 3 Complete**: Basic Gantt chart with CRUD operations

**Coming Soon**:
- Filter and search events (US2)
- Timeline navigation controls (US3)  
- Visual time indicators (US4)
- Focus time period highlighting (US5)
- Version history & comparison (US6)
- Custom group management (US7)

---

**Version**: 0.1.0 (MVP)  
**Status**: ✅ MVP Ready for Testing
