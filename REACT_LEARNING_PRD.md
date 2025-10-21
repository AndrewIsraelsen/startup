# Foundation Calendar - React Part 2 PRD
**Learning-Focused Product Requirements Document**

## Project Goal
Build a working calendar with custom event types and statistics tracking using React hooks and Syncfusion components. This will help you understand React state management, component composition, and third-party library integration.

**Time Budget**: 5 hours
**Due**: Tomorrow night
**Focus**: Calendar + Stats pages (Timeline deferred to future)

---

## What You'll Learn
- **useState**: Managing event types, events list, modal state
- **useEffect**: Loading/saving to localStorage, calculating stats
- **Props**: Passing data between components (events, event types, handler functions)
- **Custom Hooks** (bonus): Extracting localStorage logic
- **Third-party Components**: Configuring Syncfusion Schedule, creating custom editors

---

## Feature Requirements

### 1. Calendar Page (Primary Focus - 3.5 hours)

#### 1.1 Event Type System
**User Story**: As a user, I want to categorize my events by type so I can track how I spend my time.

**Requirements**:
- Start with 5 default event types:
  - Work (blue - #3B82F6)
  - School (green - #10B981)
  - Travel (purple - #8B5CF6)
  - Meal (orange - #F97316)
  - Other (gray - #6B7280)

- Each event type has:
  - Name (string)
  - Color (hex code)
  - Unique ID (for localStorage)

- Users can add new event types through a simple form/modal

**Learning Focus**: `useState` for managing the array of event types

**Implementation Hints**:
- Store event types in state: `const [eventTypes, setEventTypes] = useState([...])`
- Save to localStorage whenever eventTypes changes
- Load from localStorage on component mount

---

#### 1.2 Custom Event Type Picker
**User Story**: As a user, when I tap to create an event, I want to first select the event type (instead of seeing the default Syncfusion editor).

**Requirements**:
- When user clicks on calendar to create event, show a modal with:
  - Title: "Select Event Type"
  - List of all event types with colored circles
  - Cancel button
  - (Optional) "+ Add New Type" button at bottom

- After selecting type, show simple form:
  - Event title (text input)
  - Start time (pre-filled from where they clicked)
  - End time (pre-filled as 1 hour after start)
  - Notes (optional text area)
  - Save & Cancel buttons

**Learning Focus**:
- Modal state management
- Intercepting Syncfusion's default popup
- Controlled form inputs with `useState`

**Implementation Hints**:
- Look for Syncfusion's `popupOpen` event to intercept the default editor
- Use `args.cancel = true` to prevent default popup
- Create your own modal component (can use basic HTML/CSS or a modal library)
- Store form data in state as user types

---

#### 1.3 Event CRUD Operations
**User Story**: As a user, I want to create, view, edit, and delete events so I can manage my schedule.

**Requirements**:

**Create**:
- Use the custom type picker flow (see 1.2)
- Add event to Syncfusion with selected type's color
- Save to localStorage immediately

**Read**:
- Display all events on calendar with type-specific colors
- Load from localStorage on page load

**Update**:
- Click existing event to edit
- Show same form as create (pre-filled with event data)
- Can change type, title, times, notes
- Save changes to localStorage

**Delete**:
- Include "Delete" button in edit form
- Remove from state and localStorage
- Confirm before deleting (optional but recommended)

**Learning Focus**:
- Managing events array in state
- `useEffect` to sync with localStorage
- Updating nested objects in state (immutability)

**Implementation Hints**:
```javascript
const [events, setEvents] = useState([]);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('foundationEvents');
  if (saved) setEvents(JSON.parse(saved));
}, []);

// Save to localStorage whenever events change
useEffect(() => {
  localStorage.setItem('foundationEvents', JSON.stringify(events));
}, [events]);
```

**Data Structure**:
```javascript
{
  Id: 1,
  Subject: "Team Meeting",
  StartTime: new Date(2025, 1, 21, 10, 0),
  EndTime: new Date(2025, 1, 21, 11, 0),
  EventTypeId: "work", // links to event type
  Notes: "Discuss Q1 goals"
}
```

---

### 2. Stats Page (Secondary Focus - 1.5 hours)

#### 2.1 Time Breakdown Visualization
**User Story**: As a user, I want to see how I'm spending my time across different event types so I can understand my schedule balance.

**Requirements**:
- Show pie chart of time spent per event type for selected day
- Include "Empty Time" category (24 hours - sum of all events)
- Use event type colors in the chart
- Date selector to view different days (default to today)

**Stats to Display**:
- Pie chart showing percentage breakdown
- Legend with:
  - Event type name + color
  - Hours spent (e.g., "Work: 4.5 hours")
  - Percentage (e.g., "18.75%")

**Learning Focus**:
- Calculating derived state from events
- Using chart libraries
- Date filtering

**Implementation Hints**:
- Use a library like Chart.js or Recharts for pie chart
- Filter events by selected date
- Calculate duration: `(endTime - startTime) / (1000 * 60 * 60)` for hours
- Group by event type and sum durations

**Calculation Example**:
```javascript
// Filter events for selected day
const dayEvents = events.filter(event =>
  isSameDay(event.StartTime, selectedDate)
);

// Calculate hours per type
const typeHours = {};
dayEvents.forEach(event => {
  const hours = (event.EndTime - event.StartTime) / (1000 * 60 * 60);
  typeHours[event.EventTypeId] = (typeHours[event.EventTypeId] || 0) + hours;
});

// Calculate empty time
const totalScheduled = Object.values(typeHours).reduce((a, b) => a + b, 0);
const emptyTime = 24 - totalScheduled;
```

---

## File Structure Recommendations

```
src/
├── calendar/
│   ├── cal.jsx                    # Main calendar component
│   ├── EventTypePicker.jsx        # Modal for selecting event type
│   ├── EventForm.jsx              # Form for event details
│   └── useLocalStorage.js         # (Optional) Custom hook for localStorage
├── stats/
│   ├── stats.jsx                  # Main stats page
│   └── TimeBreakdownChart.jsx     # Pie chart component
└── shared/
    └── eventTypes.js              # Default event types config
```

---

## Step-by-Step Implementation Guide

### Phase 1: Set Up Event Types (30 min)
1. Create event types configuration file
2. Add `useState` for event types in cal.jsx
3. Test loading/saving event types to localStorage
4. (Optional) Create simple UI to add new types

### Phase 2: Custom Event Type Picker (1 hour)
1. Research Syncfusion's `popupOpen` event in their docs
2. Create EventTypePicker modal component
3. Intercept default Syncfusion popup
4. Display event types in modal
5. Handle type selection

### Phase 3: Event Creation Form (1 hour)
1. Create EventForm component
2. Add form fields (title, times, notes)
3. Connect form to Syncfusion's event creation
4. Test creating events with different types
5. Verify colors display correctly on calendar

### Phase 4: Edit & Delete (45 min)
1. Handle clicking existing events
2. Pre-fill form with event data
3. Add update logic
4. Add delete button with confirmation
5. Test all CRUD operations

### Phase 5: localStorage Persistence (30 min)
1. Add `useEffect` to load events on mount
2. Add `useEffect` to save events on change
3. Test refresh behavior
4. Handle edge cases (empty state, invalid data)

### Phase 6: Stats Page (1.5 hours)
1. Install chart library: `npm install recharts`
2. Create basic stats page layout
3. Add date selector
4. Calculate time breakdown for selected day
5. Create pie chart component
6. Style legend with event type colors
7. Test with various days and event combinations

### Phase 7: Polish & Bug Fixes (30 min)
1. Test all flows end-to-end
2. Fix any visual issues
3. Add loading states if needed
4. Verify localStorage works across page refreshes

---

## React Concepts Checklist

By completing this project, you'll practice:

- [ ] **useState**: Event types, events array, modal visibility, form inputs, selected date
- [ ] **useEffect**: localStorage sync, dependency arrays, cleanup (if needed)
- [ ] **Props**: Passing data and functions between parent/child components
- [ ] **Event Handlers**: onClick, onChange, onSubmit
- [ ] **Conditional Rendering**: Show/hide modals, empty states
- [ ] **Array Methods**: map, filter, reduce for rendering and calculations
- [ ] **Immutable Updates**: Spread operator, array methods that return new arrays
- [ ] **Controlled Components**: Form inputs tied to state

---

## Syncfusion-Specific Learning

### Key Syncfusion Concepts:
1. **ScheduleComponent**: Main calendar container
2. **eventSettings**: How to provide data to the calendar
3. **popupOpen**: Event that fires before editor opens (intercept this!)
4. **ViewsDirective/ViewDirective**: Configure which views are available
5. **Inject services**: Tell Syncfusion which features to enable

### Important Props to Explore:
- `eventSettings.dataSource`: Your events array
- `eventSettings.fields`: Map your data structure to Syncfusion's expected format
- `selectedDate`: Control which date is shown
- `popupOpen`: Intercept editor popup
- `actionComplete`: Fires after user actions (create, update, delete)

### Documentation Links:
- Syncfusion Schedule: https://ej2.syncfusion.com/react/documentation/schedule/getting-started
- Event handling: https://ej2.syncfusion.com/react/documentation/schedule/editor-template
- Data binding: https://ej2.syncfusion.com/react/documentation/schedule/data-binding

---

## Testing Checklist

Before submitting, verify:

**Calendar**:
- [ ] Can create events with different types
- [ ] Events display with correct colors
- [ ] Can edit event details and type
- [ ] Can delete events
- [ ] Events persist after page refresh
- [ ] Can add new event types
- [ ] New event types persist after refresh

**Stats**:
- [ ] Pie chart shows correct breakdown for selected day
- [ ] Can change selected date
- [ ] Empty time is calculated correctly
- [ ] Chart uses event type colors
- [ ] Shows meaningful data when no events exist

**General**:
- [ ] No console errors
- [ ] Works in different browsers
- [ ] Responsive on different screen sizes

---

## Deliverable Requirements Met

This implementation satisfies:
- [x] **All functionality implemented or mocked out**: Calendar CRUD + Stats visualization
- [x] **Hooks**: useState (multiple instances), useEffect (localStorage + calculations)
- [x] **Reactivity**: Events update across components, stats recalculate on changes
- [x] **Component composition**: Reusable components (EventTypePicker, EventForm, Chart)

---

## Future Enhancements (After Deadline)

1. **Timeline Page**: Show chronological list of events filtered by type
2. **Week Stats**: Expand stats to show week/month views
3. **Drag & Drop**: Enable moving events on calendar
4. **Event Validation**: Prevent overlapping events, time conflicts
5. **Export/Import**: Download/upload calendar data
6. **Multiple Views**: Add week/month views to calendar
7. **Search/Filter**: Find events by title, type, date range
8. **Recurring Events**: Support repeating events

---

## Getting Help

When you get stuck:

1. **Syncfusion Docs**: Search for the specific component/prop you're working with
2. **React DevTools**: Inspect state/props to debug issues
3. **Console Logging**: Log state before/after updates to see what's changing
4. **Break It Down**: If something's complex, get the simplest version working first

Remember: The goal is learning, not perfection. Focus on understanding WHY things work, not just getting them to work.

Good luck! You've got this! 🚀
