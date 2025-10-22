# Foundation Calendar - Complete Step-by-Step Tutorial
**A Beginner's Guide to React Hooks & Syncfusion Components**

## Table of Contents
1. [Understanding What We're Building](#understanding-what-were-building)
2. [React Concepts You'll Learn](#react-concepts-youll-learn)
3. [Phase 1: Setting Up Event Types](#phase-1-setting-up-event-types-1-hour)
4. [Phase 2: Understanding Syncfusion Schedule](#phase-2-understanding-syncfusion-schedule-30-min)
5. [Phase 3: Creating Custom Event Type Picker](#phase-3-creating-custom-event-type-picker-1-hour)
6. [Phase 4: Building the Event Form](#phase-4-building-the-event-form-1-hour)
7. [Phase 5: Implementing Edit & Delete](#phase-5-implementing-edit--delete-45-min)
8. [Phase 6: Building the Stats Page](#phase-6-building-the-stats-page-15-hours)
9. [Testing & Debugging](#testing--debugging)

---

## Understanding What We're Building

### The Big Picture
You're building a calendar app where:
1. Users click on an empty calendar space to create a new event
2. A modal pops up asking them to choose an event type (Work, School, etc.)
3. After choosing a type, they fill out a form (title, time, notes, and can change type via dropdown)
4. Users can click existing events to edit them directly (skips type picker)
5. Events are saved to localStorage and displayed on the calendar with color-coded types
6. A stats page shows a pie chart of how time is spent per day

### Why This Teaches React
- **useState**: You'll manage multiple pieces of state (events, event types, modals, forms)
- **useEffect**: You'll sync with localStorage and calculate statistics
- **Props**: You'll pass data between parent and child components
- **Event Handlers**: You'll respond to user clicks, form submissions, etc.

---

## React Concepts You'll Learn

### 1. useState Hook
Think of `useState` as a way to remember information in your component.

**Basic Example:**
```javascript
const [count, setCount] = useState(0);
// count = current value (starts at 0)
// setCount = function to update count
```

**When You Use It:**
- Any time your component needs to "remember" something
- Form inputs, modal visibility, lists of data, etc.

**Important Rules:**
- NEVER modify state directly: `count = 5` ❌
- ALWAYS use the setter function: `setCount(5)` ✅
- For arrays/objects, create a NEW copy: `setEvents([...events, newEvent])`

### 2. useEffect Hook
Think of `useEffect` as a way to "do something" when something changes.

**Basic Example:**
```javascript
useEffect(() => {
  // This code runs after component renders
  console.log('Component rendered!');
}, []); // Empty array = run only once on mount
```

**Dependency Array (the `[]` part):**
- `[]` = Run once when component first loads
- `[events]` = Run whenever `events` changes
- No array = Run after EVERY render (usually not what you want!)

**When You Use It:**
- Loading data from localStorage
- Saving data when it changes
- Calculating values based on state

### 3. Props
Props are how you pass data from parent to child components.

**Example:**
```javascript
// Parent component
<EventTypePicker eventTypes={eventTypes} onSelect={handleTypeSelect} />

// Child component
function EventTypePicker({ eventTypes, onSelect }) {
  // Now you can use eventTypes and onSelect in this component
}
```

---

## Phase 1: Setting Up Event Types (1 hour)

### Step 1.1: Create Event Types Configuration File

**Why:** We need a central place to define our event types and their colors.

**Create new file:** `src/shared/eventTypes.js`

First, create the `shared` folder if it doesn't exist:
1. In VS Code, right-click on `src` folder
2. Click "New Folder"
3. Name it `shared`

Then create the file:

```javascript
// This file defines the default event types for our calendar

export const DEFAULT_EVENT_TYPES = [
  {
    id: 'work',           // Unique identifier (use lowercase, no spaces)
    name: 'Work',         // Display name
    color: '#3B82F6'      // Hex color code (blue)
  },
  {
    id: 'school',
    name: 'School',
    color: '#10B981'      // Green
  },
  {
    id: 'travel',
    name: 'Travel',
    color: '#8B5CF6'      // Purple
  },
  {
    id: 'meal',
    name: 'Meal',
    color: '#F97316'      // Orange
  },
  {
    id: 'other',
    name: 'Other',
    color: '#6B7280'      // Gray
  }
];
```

**Understanding the Structure:**
- Each event type is an object with 3 properties
- `id` is used internally (for saving to localStorage, matching events to types)
- `name` is what users see
- `color` will be used for both the calendar events and the type picker

---

### Step 1.2: Add Event Types State to Calendar Component

**Why:** We need to store event types in React state so we can display them, modify them, and save them to localStorage.

**Open:** `src/calendar/cal.jsx`

**Add these imports at the top:**
```javascript
import React, { useState, useEffect } from 'react';
import '../app.css'
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Inject } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { DEFAULT_EVENT_TYPES } from '../shared/eventTypes';  // ADD THIS LINE
```

**Understanding the imports:**
- `useState` = Hook for managing state
- `useEffect` = Hook for side effects (like localStorage)
- `DEFAULT_EVENT_TYPES` = Our event types configuration we just created

**Inside the `Cal` component function, DELETE the old `data` array and ADD this code BEFORE the return statement:**

```javascript
export function Cal() {
  // Syncfusion license (keep your existing one)
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1JFaF1cX2hIfkx0TXxbf1x1ZFREal9RTnRWUiweQnxTdEBiWX1fcHRWRmJVV0N3WkleYg=="
  );

  // STATE: Event types that users can assign to events
  // We start with default types, but users can add more
  const [eventTypes, setEventTypes] = useState([]);

  // EFFECT: Load event types from localStorage when component first mounts
  useEffect(() => {
    console.log('Loading event types from localStorage...');

    const savedTypes = localStorage.getItem('foundationEventTypes');

    if (savedTypes) {
      // If we found saved types, use them
      console.log('Found saved event types:', savedTypes);
      setEventTypes(JSON.parse(savedTypes));
    } else {
      // If no saved types, use defaults
      console.log('No saved types found, using defaults');
      setEventTypes(DEFAULT_EVENT_TYPES);
    }
  }, []); // Empty array = run only once on mount

  // EFFECT: Save event types to localStorage whenever they change
  useEffect(() => {
    if (eventTypes.length > 0) {
      console.log('Saving event types to localStorage:', eventTypes);
      localStorage.setItem('foundationEventTypes', JSON.stringify(eventTypes));
    }
  }, [eventTypes]); // Run whenever eventTypes changes

  // ... (we'll add more state and the return statement below)
```

**Let's Break This Down:**

1. **First useState:**
   - Creates a variable `eventTypes` (starts as empty array)
   - Creates a function `setEventTypes` to update it
   - Think: "I need to remember the list of event types"

2. **First useEffect (Loading):**
   - Runs once when component loads (because of `[]`)
   - Checks localStorage for saved event types
   - If found: uses saved types
   - If not found: uses DEFAULT_EVENT_TYPES
   - Think: "When I first load, check if we have saved data"

3. **Second useEffect (Saving):**
   - Runs whenever `eventTypes` changes (because of `[eventTypes]`)
   - Saves current event types to localStorage
   - The `if` check prevents saving an empty array on first render
   - Think: "Whenever event types change, save them"

---

### Step 1.3: Add Events State

**Why:** We need to store the actual calendar events (meetings, tasks, etc.)

**In the same `cal.jsx` file, add this state and effects AFTER the event types code:**

```javascript
// STATE: All calendar events
const [events, setEvents] = useState([]);

// EFFECT: Load events from localStorage on mount
useEffect(() => {
  console.log('Loading events from localStorage...');

  const savedEvents = localStorage.getItem('foundationEvents');

  if (savedEvents) {
    const parsedEvents = JSON.parse(savedEvents);

    // IMPORTANT: Convert date strings back to Date objects
    // localStorage stores dates as strings, but Syncfusion needs Date objects
    const eventsWithDates = parsedEvents.map(event => ({
      ...event,
      StartTime: new Date(event.StartTime),
      EndTime: new Date(event.EndTime)
    }));

    console.log('Loaded events:', eventsWithDates);
    setEvents(eventsWithDates);
  }
}, []);

// EFFECT: Save events to localStorage whenever they change
useEffect(() => {
  if (events.length >= 0) { // Note: >= 0 allows saving empty array
    console.log('Saving events to localStorage:', events);
    localStorage.setItem('foundationEvents', JSON.stringify(events));
  }
}, [events]);
```

**Why the Date Conversion?**
- localStorage can only store strings
- When you save a Date object, it becomes a string
- When you load it back, it's still a string (not a Date object)
- Syncfusion Schedule needs real Date objects
- `.map()` creates a new array with converted dates

---

### Step 1.4: Update Syncfusion to Use State

**Why:** Currently your calendar uses hardcoded `data`. We need to use our `events` state instead.

**In `cal.jsx`, find the return statement and update it to:**

```javascript
return (
  <main className="flex justify-center items-center">
    <ScheduleComponent
      width={400}
      height={500}
      eventSettings={{
        dataSource: events  // Changed from 'data' to 'events'
      }}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
      </ViewsDirective>
      <Inject services={[Day]} />
    </ScheduleComponent>
  </main>
);
```

**What Changed:**
- `dataSource: data` → `dataSource: events`
- Now the calendar displays events from our state
- When state updates, calendar automatically re-renders

**Test It:**
1. Save the file
2. Refresh the page in your browser
3. Calendar should be empty (no events in localStorage yet)
4. Open browser console (F12 or right-click → Inspect → Console tab)
5. You should see console logs: "Loading event types from localStorage..."
6. No errors should appear

---

## Phase 2: Understanding Syncfusion Schedule (30 min)

### How Syncfusion Schedule Works

Think of Syncfusion Schedule like a fancy table that displays time slots and events.

**Key Concepts:**

1. **Data Source:**
   - You give it an array of event objects
   - It displays them in the calendar
   - When data changes, it automatically updates

2. **Event Objects Structure:**
   ```javascript
   {
     Id: 1,                    // Must be unique
     Subject: "Meeting",       // Event title
     StartTime: Date object,   // When it starts
     EndTime: Date object,     // When it ends
     EventTypeId: "work",      // Our custom field
     Notes: "Bring laptop",    // Our custom field
     Color: "#3B82F6"          // Our custom field for event color
   }
   ```

3. **Built-in Events (things Syncfusion tells you about):**
   - `popupOpen` - Fires when a popup is about to show
   - `actionComplete` - Fires after user creates/edits/deletes
   - `actionBegin` - Fires before user creates/edits/deletes

---

### Step 2.1: Understanding popupOpen

**What is it?**
- An event that fires BEFORE Syncfusion shows its default editor
- Gives you a chance to cancel it and show your own UI instead

**How to use it:**

```javascript
<ScheduleComponent
  popupOpen={onPopupOpen}  // Connect your function
  // ... other props
>
```

**The function:**
```javascript
const onPopupOpen = (args) => {
  console.log('Popup opening!', args);

  // args contains:
  // - type: what kind of popup (e.g., "Editor", "QuickInfo")
  // - data: the event being edited (if editing)
  // - cancel: set to true to prevent default popup

  if (args.type === 'Editor') {
    args.cancel = true;  // Stop Syncfusion's editor from showing
    // Now show your own modal instead
  }
};
```

---

### Step 2.2: Understanding Event Data Flow

**When Creating a New Event:**
1. User clicks on calendar
2. `popupOpen` fires with `type: 'Editor'`
3. `args.data` contains suggested start/end times based on where they clicked
4. You cancel the default popup
5. You show your custom modal
6. User fills out your form
7. You add the new event to `events` state
8. Syncfusion sees the state change and displays the event

**When Editing an Existing Event:**
1. User clicks on an event
2. `popupOpen` fires with `type: 'Editor'`
3. `args.data` contains the full event object
4. You cancel the default popup
5. You show your custom modal (pre-filled with event data)
6. User edits the form
7. You update the event in `events` state
8. Syncfusion sees the state change and updates the display

---

## Phase 3: Creating Custom Event Type Picker (1 hour)

### Step 3.1: Create the EventTypePicker Component

**Why:** We need a modal that shows event types for users to choose from.

**Create new file:** `src/calendar/EventTypePicker.jsx`

```javascript
import React from 'react';
import '../app.css';

/**
 * EventTypePicker Component
 *
 * This modal appears when user wants to create a new event.
 * It shows a list of event types with colored circles.
 *
 * Props:
 * - isOpen: boolean - whether modal is visible
 * - eventTypes: array - list of available event types
 * - onSelectType: function - called when user picks a type
 * - onCancel: function - called when user cancels
 */
export function EventTypePicker({ isOpen, eventTypes, onSelectType, onCancel }) {

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // Overlay: dark background that covers the whole screen
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000  // Make sure it appears on top
      }}
      onClick={onCancel}  // Click outside modal to close
    >
      {/* Modal content */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}  // Don't close when clicking inside
      >
        {/* Header */}
        <h2 style={{ marginTop: 0, marginBottom: '24px' }}>
          Select Event Type
        </h2>

        {/* Event type list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {eventTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              {/* Colored circle */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: type.color,
                  flexShrink: 0  // Don't let it shrink
                }}
              />

              {/* Type name */}
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

**Understanding This Component:**

1. **Props Destructuring:**
   ```javascript
   function EventTypePicker({ isOpen, eventTypes, onSelectType, onCancel }) {
   ```
   - This extracts props directly into variables
   - Same as: `const isOpen = props.isOpen; const eventTypes = props.eventTypes;` etc.

2. **Conditional Rendering:**
   ```javascript
   if (!isOpen) return null;
   ```
   - If modal isn't open, don't render anything
   - This is how we show/hide the modal

3. **Event Bubbling:**
   ```javascript
   onClick={(e) => e.stopPropagation()}
   ```
   - Prevents click inside modal from triggering the overlay's onClick
   - Without this, clicking inside would close the modal

4. **Map Function:**
   ```javascript
   eventTypes.map((type) => (
     <button key={type.id}>...</button>
   ))
   ```
   - `.map()` transforms each event type into a button
   - `key={type.id}` helps React track which button is which

---

### Step 3.2: Add Modal State to Cal Component

**Open:** `src/calendar/cal.jsx`

**Add these new state variables AFTER your existing state:**

```javascript
// STATE: Controls whether type picker modal is visible
const [showTypePicker, setShowTypePicker] = useState(false);

// STATE: Stores the event data while user is creating/editing
// This holds the time/date info from where they clicked
const [pendingEventData, setPendingEventData] = useState(null);

// STATE: When editing, stores which event is being edited
const [editingEvent, setEditingEvent] = useState(null);
```

**Understanding Each State:**

1. **showTypePicker:**
   - `true` = modal is visible
   - `false` = modal is hidden
   - We toggle this when user clicks on calendar

2. **pendingEventData:**
   - When user clicks on calendar, Syncfusion tells us the time they clicked
   - We store that info here while they choose a type
   - After they choose, we'll use this data to create the event

3. **editingEvent:**
   - When user clicks existing event, we store it here
   - `null` = creating new event
   - Not null = editing existing event
   - Helps us know whether to add or update

---

### Step 3.3: Implement Click Handlers for Single-Click Events

**Add these functions in `cal.jsx`, BEFORE the return statement:**

```javascript
/**
 * Handles when user clicks on an empty cell (to create new event)
 */
const onCellClick = (args) => {
  console.log('Cell clicked:', args);

  // Create pending event data from the clicked cell
  setPendingEventData({
    StartTime: args.startTime,
    EndTime: args.endTime
  });
  setEditingEvent(null);

  // Show type picker immediately
  setShowTypePicker(true);
};

/**
 * Handles when user clicks on an existing event
 */
const onEventClick = (args) => {
  console.log('Event clicked:', args.event);

  // Set the event being edited
  setEditingEvent(args.event);
  setPendingEventData(null);

  // For editing, skip type picker and go straight to event form
  // The event type will be pre-filled in the form's dropdown
  const eventType = eventTypes.find(t => t.id === args.event.EventTypeId);
  setSelectedEventType(eventType);

  // Show event form directly (skip type picker)
  setShowEventForm(true);
};

/**
 * Handles when Syncfusion tries to open a popup
 * We intercept this to prevent ALL Syncfusion popups
 */
const onPopupOpen = (args) => {
  console.log('popupOpen triggered:', args.type);

  // Prevent ALL Syncfusion popups
  args.cancel = true;
};
```

**Let's Break This Down:**

1. **onCellClick - Single click on empty space:**
   - Fires when user clicks an empty calendar cell
   - Captures the start/end time from the click
   - Shows the type picker modal immediately
   - Used for creating NEW events

2. **onEventClick - Single click on existing event:**
   - Fires when user clicks an existing event
   - Skips the type picker (user already chose a type)
   - Goes directly to the event form for editing
   - Pre-fills the event type in the form's dropdown

3. **onPopupOpen - Prevents all Syncfusion popups:**
   - We still need this to block Syncfusion's default behavior
   - `args.cancel = true` prevents any Syncfusion popup from showing
   - We handle everything with our custom click handlers instead

---

### Step 3.4: Handle Type Selection

**Add this function in `cal.jsx`:**

```javascript
/**
 * Handles when user selects an event type from the picker
 * This doesn't save the event yet - we'll show the detail form next (Phase 4)
 */
const handleTypeSelected = (selectedType) => {
  console.log('User selected type:', selectedType);

  // Close the type picker
  setShowTypePicker(false);

  // TODO: In next phase, we'll open the event detail form here
  // For now, let's just create a basic event to test

  if (editingEvent) {
    // Editing existing event - update its type
    const updatedEvent = {
      ...editingEvent,
      EventTypeId: selectedType.id,
      Color: selectedType.color
    };

    // Update in events array
    setEvents(events.map(evt =>
      evt.Id === editingEvent.Id ? updatedEvent : evt
    ));

  } else {
    // Creating new event - make a default event
    const newEvent = {
      Id: Date.now(), // Simple unique ID (timestamp)
      Subject: `New ${selectedType.name} Event`,
      StartTime: pendingEventData.StartTime,
      EndTime: pendingEventData.EndTime,
      EventTypeId: selectedType.id,
      Color: selectedType.color,
      Notes: ''
    };

    // Add to events array
    setEvents([...events, newEvent]);
  }

  // Clear pending data
  setPendingEventData(null);
  setEditingEvent(null);
};
```

**Understanding the Array Updates:**

1. **Editing (map):**
   ```javascript
   events.map(evt => evt.Id === editingEvent.Id ? updatedEvent : evt)
   ```
   - `.map()` creates a NEW array
   - For each event: if it's the one we're editing, replace it; otherwise keep it
   - This follows React's immutability rule (never modify state directly!)

2. **Creating (spread operator):**
   ```javascript
   [...events, newEvent]
   ```
   - Creates a NEW array
   - Contains all old events PLUS the new one
   - Never do `events.push(newEvent)` - that modifies the original array!

---

### Step 3.5: Wire Everything Together

**Update your ScheduleComponent in `cal.jsx`:**

```javascript
<ScheduleComponent
  width={400}
  height={500}
  eventSettings={{
    dataSource: events,
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' }
    }
  }}
  eventRendered={(args) => {
    if (args.data.Color) {
      args.element.style.backgroundColor = args.data.Color;
    }
  }}
  popupOpen={onPopupOpen}
  showQuickInfo={false}
  cellClick={onCellClick}
  eventClick={onEventClick}
>
  <ViewsDirective>
    <ViewDirective option="Day" />
  </ViewsDirective>
  <Inject services={[Day]} />
</ScheduleComponent>
```

**What These Props Do:**

- **eventRendered**: Applies custom colors to events based on their event type
- **popupOpen**: Prevents Syncfusion popups from showing
- **showQuickInfo**: Disables Syncfusion's "quick info" tooltip popup
- **cellClick**: Handles single clicks on empty calendar cells (create new event)
- **eventClick**: Handles single clicks on existing events (edit event)

**Import the EventTypePicker at the top of `cal.jsx`:**

```javascript
import { EventTypePicker } from './EventTypePicker';
```

**Add the EventTypePicker component in the return statement, AFTER ScheduleComponent:**

```javascript
return (
  <main className="flex justify-center items-center">
    <ScheduleComponent
      width={400}
      height={500}
      eventSettings={{
        dataSource: events,
        fields: {
          id: 'Id',
          subject: { name: 'Subject' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' }
        }
      }}
      popupOpen={onPopupOpen}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
      </ViewsDirective>
      <Inject services={[Day]} />
    </ScheduleComponent>

    <EventTypePicker
      isOpen={showTypePicker}
      eventTypes={eventTypes}
      onSelectType={handleTypeSelected}
      onCancel={() => {
        setShowTypePicker(false);
        setPendingEventData(null);
        setEditingEvent(null);
      }}
    />
  </main>
);
```

---

### Step 3.6: Test the Type Picker

**Testing Steps:**

1. Save all files
2. Refresh your browser
3. Click anywhere on the calendar
4. You should see the "Select Event Type" modal appear
5. Click on a type (e.g., "Work")
6. Modal should close and a new event should appear on the calendar
7. Open browser console (F12) and check for logs
8. Refresh the page - event should still be there (localStorage!)

**Common Issues:**

- **Modal doesn't appear:** Check console for errors, verify `isOpen` prop is connected
- **Clicking type does nothing:** Check `onSelectType` function is defined and connected
- **Event doesn't appear:** Check `setEvents` is being called, look at console logs
- **Event disappears on refresh:** Open DevTools → Application tab → Local Storage → verify data is saved

---

## Phase 4: Building the Event Form (1 hour)

### Step 4.1: Create EventForm Component

**Why:** After user selects type, we need a form to enter event details.

**Create new file:** `src/calendar/EventForm.jsx`

```javascript
import React, { useState, useEffect } from 'react';

/**
 * EventForm Component
 *
 * Form for entering event details (title, time, notes)
 * Appears after user selects an event type
 *
 * Props:
 * - isOpen: boolean - whether modal is visible
 * - eventType: object - the initially selected event type
 * - eventTypes: array - all available event types for dropdown
 * - eventData: object - initial data (times from calendar click, or existing event)
 * - onSave: function - called when user saves
 * - onCancel: function - called when user cancels
 */
export function EventForm({ isOpen, eventType, eventTypes, eventData, onSave, onCancel }) {

  // Form field states
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedEventType, setSelectedEventType] = useState(null);

  // When eventType or eventData changes, populate the form
  useEffect(() => {
    // Set the selected event type (either from initial selection or existing event)
    if (eventData?.EventTypeId) {
      // Editing existing event - find the event type by ID
      const type = eventTypes?.find(t => t.id === eventData.EventTypeId);
      setSelectedEventType(type || eventType);
    } else {
      // New event - use the initially selected type
      setSelectedEventType(eventType);
    }

    if (eventData) {
      // If editing existing event, pre-fill all fields
      setSubject(eventData.Subject || '');
      setNotes(eventData.Notes || '');

      // Convert Date objects to input-friendly format
      // Input type="datetime-local" needs format: "2025-01-21T10:00"
      if (eventData.StartTime) {
        setStartTime(formatDateForInput(eventData.StartTime));
      }
      if (eventData.EndTime) {
        setEndTime(formatDateForInput(eventData.EndTime));
      }
    }
  }, [eventData, eventType, eventTypes]);

  /**
   * Converts Date object to format needed by datetime-local input
   * Example: Wed Jan 21 2025 10:00:00 → "2025-01-21T10:00"
   */
  const formatDateForInput = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page refresh

    // Validate required fields
    if (!subject.trim()) {
      alert('Please enter an event title');
      return;
    }

    if (!startTime || !endTime) {
      alert('Please enter start and end times');
      return;
    }

    // Create event object
    const event = {
      ...eventData,  // Keep existing data (like Id if editing)
      Subject: subject,
      StartTime: new Date(startTime),  // Convert string back to Date
      EndTime: new Date(endTime),
      Notes: notes,
      EventTypeId: selectedEventType.id,
      Color: selectedEventType.color
    };

    // Call parent's save handler
    onSave(event);

    // Clear form
    setSubject('');
    setStartTime('');
    setEndTime('');
    setNotes('');
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001  // Higher than type picker
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>
            {eventData?.Id ? 'Edit' : 'New'} Event
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Event Type Dropdown */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Event Type *
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedEventType?.id || ''}
                onChange={(e) => {
                  const type = eventTypes.find(t => t.id === e.target.value);
                  setSelectedEventType(type);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {eventTypes?.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {/* Color indicator circle */}
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: selectedEventType?.color || '#6B7280',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          {/* Title field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Event Title *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter event title"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
              autoFocus
            />
          </div>

          {/* Start time field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Start Time *
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* End time field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              End Time *
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Notes field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details"
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: eventType?.color || '#3B82F6',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Save Event
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**Understanding Key Concepts:**

1. **Controlled Inputs:**
   ```javascript
   <input value={subject} onChange={(e) => setSubject(e.target.value)} />
   ```
   - Input value is controlled by React state
   - When user types, we update state
   - When state changes, input updates
   - This is the React way!

2. **useEffect for Pre-filling:**
   ```javascript
   useEffect(() => {
     if (eventData) {
       setSubject(eventData.Subject || '');
     }
   }, [eventData]);
   ```
   - Runs when `eventData` changes
   - Pre-fills form when editing
   - Starts empty when creating

3. **Date Formatting:**
   - `<input type="datetime-local">` needs specific format: "YYYY-MM-DDTHH:MM"
   - We convert Date → string for input
   - We convert string → Date when saving

4. **Form Submission:**
   ```javascript
   const handleSubmit = (e) => {
     e.preventDefault();  // Stops page refresh!
     // ... rest of logic
   }
   ```
   - Forms normally refresh page on submit
   - `preventDefault` stops that
   - We handle submission ourselves

---

### Step 4.2: Update Cal Component to Use EventForm

**Open:** `src/calendar/cal.jsx`

**Add these new state variables:**

```javascript
// STATE: Controls whether event form modal is visible
const [showEventForm, setShowEventForm] = useState(false);

// STATE: The selected event type (after user picks from type picker)
const [selectedEventType, setSelectedEventType] = useState(null);
```

**REPLACE the `handleTypeSelected` function with this updated version:**

```javascript
const handleTypeSelected = (selectedType) => {
  console.log('User selected type:', selectedType);

  // Store the selected type
  setSelectedEventType(selectedType);

  // Close type picker
  setShowTypePicker(false);

  // Open event form
  setShowEventForm(true);

  // Note: we're NOT creating the event yet
  // We'll wait for user to fill out the form
};
```

**Add new function to handle form save:**

```javascript
/**
 * Handles when user saves the event form
 */
const handleEventSave = (event) => {
  console.log('Saving event:', event);

  if (event.Id && editingEvent) {
    // Editing existing event - update it
    setEvents(events.map(evt =>
      evt.Id === event.Id ? event : evt
    ));
  } else {
    // Creating new event - add it
    const newEvent = {
      ...event,
      Id: Date.now()  // Generate unique ID
    };
    setEvents([...events, newEvent]);
  }

  // Close form and clear state
  setShowEventForm(false);
  setPendingEventData(null);
  setEditingEvent(null);
  setSelectedEventType(null);
};
```

**Import the EventForm at the top:**

```javascript
import { EventForm } from './EventForm';
```

**Add the EventForm component to your return statement (after EventTypePicker):**

```javascript
return (
  <main className="flex justify-center items-center">
    <ScheduleComponent
      width={400}
      height={500}
      eventSettings={{
        dataSource: events,
        fields: {
          id: 'Id',
          subject: { name: 'Subject' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' }
        }
      }}
      popupOpen={onPopupOpen}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
      </ViewsDirective>
      <Inject services={[Day]} />
    </ScheduleComponent>

    <EventTypePicker
      isOpen={showTypePicker}
      eventTypes={eventTypes}
      onSelectType={handleTypeSelected}
      onCancel={() => {
        setShowTypePicker(false);
        setPendingEventData(null);
        setEditingEvent(null);
      }}
    />

    <EventForm
      isOpen={showEventForm}
      eventType={selectedEventType}
      eventTypes={eventTypes}
      eventData={editingEvent || pendingEventData}
      onSave={handleEventSave}
      onCancel={() => {
        setShowEventForm(false);
        setPendingEventData(null);
        setEditingEvent(null);
        setSelectedEventType(null);
      }}
    />
  </main>
);
```

---

### Step 4.3: Test Event Creation Flow

**Complete Flow Test:**

1. Click on calendar
2. Type picker modal appears
3. Click "Work"
4. Type picker closes, event form opens
5. Header shows "New Work" with blue circle
6. Start/end times are pre-filled
7. Enter title: "Team Meeting"
8. Add notes: "Discuss Q1 goals"
9. Click "Save Event"
10. Form closes, event appears on calendar with blue color
11. Refresh page - event still there!

**Test Editing:**

1. Click on an existing event
2. Type picker appears
3. Select a type (can be same or different)
4. Event form appears with all fields filled
5. Change the title
6. Click "Save Event"
7. Event updates on calendar

---

## Phase 5: Implementing Edit & Delete (45 min)

### Step 5.1: Add Delete Functionality

**Update EventForm.jsx to include delete button:**

**Add this prop to the function signature (line 14):**

```javascript
export function EventForm({ isOpen, eventType, eventData, onSave, onCancel, onDelete }) {
```

**Add delete button in the form, BEFORE the Save/Cancel buttons div (around line 177):**

```javascript
{/* Delete button (only show when editing) */}
{eventData?.Id && (
  <button
    type="button"
    onClick={() => {
      if (window.confirm('Are you sure you want to delete this event?')) {
        onDelete(eventData.Id);
      }
    }}
    style={{
      width: '100%',
      padding: '12px',
      marginBottom: '12px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#EF4444',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    }}
  >
    Delete Event
  </button>
)}

{/* Existing Save/Cancel buttons */}
<div style={{ display: 'flex', gap: '12px' }}>
  {/* ... Save and Cancel buttons ... */}
</div>
```

**Understanding:**
- `eventData?.Id` - Only show delete button if editing (has an Id)
- `window.confirm()` - Browser's built-in confirmation dialog
- Returns true if user clicks OK, false if Cancel

---

### Step 5.2: Add Delete Handler in Cal Component

**In `cal.jsx`, add this function:**

```javascript
/**
 * Handles deleting an event
 */
const handleEventDelete = (eventId) => {
  console.log('Deleting event:', eventId);

  // Filter out the event with this ID
  setEvents(events.filter(evt => evt.Id !== eventId));

  // Close form and clear state
  setShowEventForm(false);
  setPendingEventData(null);
  setEditingEvent(null);
  setSelectedEventType(null);
};
```

**Understanding `.filter()`:**
- Creates a NEW array
- Only includes items where the function returns `true`
- `evt.Id !== eventId` means "keep all events EXCEPT the one we're deleting"

**Update EventForm in return statement to include onDelete prop:**

```javascript
<EventForm
  isOpen={showEventForm}
  eventType={selectedEventType}
  eventTypes={eventTypes}  // ADD THIS LINE
  eventData={editingEvent || pendingEventData}
  onSave={handleEventSave}
  onDelete={handleEventDelete}
  onCancel={() => {
    setShowEventForm(false);
    setPendingEventData(null);
    setEditingEvent(null);
    setSelectedEventType(null);
  }}
/>
```

---

### Step 5.3: Test Delete

1. Click on an existing event
2. Select type (type picker appears first)
3. Edit form appears
4. Red "Delete Event" button shows at bottom
5. Click delete
6. Confirmation dialog appears: "Are you sure you want to delete this event?"
7. Click OK
8. Event disappears from calendar
9. Refresh page - event is still gone (persisted in localStorage)

---

## Phase 6: Building the Stats Page (1.5 hours)

### Step 6.1: Install Chart Library

**Open terminal in VS Code:**
- View → Terminal (or Ctrl+` on Windows, Cmd+` on Mac)

**Run this command:**

```bash
npm install recharts
```

**What is Recharts?**
- React charting library
- Makes it easy to create pie charts, bar charts, etc.
- Works well with React state
- Automatically responsive

**Wait for install to complete** before moving to next step. You should see output like:
```
added 1 package, and audited X packages in Ys
```

---

### Step 6.2: Create Stats Page

**Open:** `src/stats/stats.jsx`

**REPLACE the entire file with this code:**

```javascript
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DEFAULT_EVENT_TYPES } from '../shared/eventTypes';
import './stats.css';

export function Stats() {
  // Load events from localStorage
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load events and event types on mount
  useEffect(() => {
    console.log('Stats page: Loading data from localStorage...');

    // Load events
    const savedEvents = localStorage.getItem('foundationEvents');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      const eventsWithDates = parsedEvents.map(event => ({
        ...event,
        StartTime: new Date(event.StartTime),
        EndTime: new Date(event.EndTime)
      }));
      console.log('Loaded events:', eventsWithDates);
      setEvents(eventsWithDates);
    }

    // Load event types
    const savedTypes = localStorage.getItem('foundationEventTypes');
    if (savedTypes) {
      setEventTypes(JSON.parse(savedTypes));
    } else {
      setEventTypes(DEFAULT_EVENT_TYPES);
    }
  }, []);

  /**
   * Check if two dates are the same day
   */
  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  /**
   * Calculate time breakdown for selected date
   */
  const calculateTimeBreakdown = () => {
    console.log('Calculating time breakdown for:', selectedDate);

    // Filter events for selected day
    const dayEvents = events.filter(event =>
      isSameDay(new Date(event.StartTime), selectedDate)
    );

    console.log('Events for selected day:', dayEvents);

    // Calculate hours per event type
    const typeHours = {};

    dayEvents.forEach(event => {
      const start = new Date(event.StartTime);
      const end = new Date(event.EndTime);
      const hours = (end - start) / (1000 * 60 * 60); // Convert ms to hours

      if (typeHours[event.EventTypeId]) {
        typeHours[event.EventTypeId] += hours;
      } else {
        typeHours[event.EventTypeId] = hours;
      }
    });

    console.log('Hours per type:', typeHours);

    // Build chart data array
    const chartData = [];

    // Add data for each event type that has time
    eventTypes.forEach(type => {
      if (typeHours[type.id] && typeHours[type.id] > 0) {
        chartData.push({
          name: type.name,
          value: Number(typeHours[type.id].toFixed(2)), // Round to 2 decimals
          hours: typeHours[type.id],
          color: type.color
        });
      }
    });

    // Calculate empty time (24 hours - scheduled time)
    const totalScheduled = Object.values(typeHours).reduce((sum, hours) => sum + hours, 0);
    const emptyTime = 24 - totalScheduled;

    if (emptyTime > 0) {
      chartData.push({
        name: 'Empty Time',
        value: Number(emptyTime.toFixed(2)),
        hours: emptyTime,
        color: '#E5E7EB'
      });
    }

    console.log('Chart data:', chartData);
    return chartData;
  };

  const chartData = calculateTimeBreakdown();

  /**
   * Format date for input (YYYY-MM-DD)
   */
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Format date for display (e.g., "January 21, 2025")
   */
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Custom label for pie chart slices
   */
  const renderLabel = (entry) => {
    const percentage = ((entry.value / 24) * 100).toFixed(1);
    return `${percentage}%`;
  };

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Date selector */}
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1>Time Breakdown</h1>
        <div style={{ marginTop: '16px' }}>
          <label style={{ marginRight: '12px', fontWeight: '500' }}>
            Select Date:
          </label>
          <input
            type="date"
            value={formatDateForInput(selectedDate)}
            onChange={(e) => {
              const newDate = new Date(e.target.value + 'T00:00:00');
              console.log('Date changed to:', newDate);
              setSelectedDate(newDate);
            }}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
        </div>
        <p style={{ marginTop: '8px', color: '#6B7280' }}>
          {formatDateForDisplay(selectedDate)}
        </p>
      </div>

      {/* Pie chart */}
      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${props.payload.hours.toFixed(2)} hours`,
                  name
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Detailed breakdown */}
          <div style={{ marginTop: '32px' }}>
            <h3>Detailed Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chartData.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        backgroundColor: entry.color
                      }}
                    />
                    <span style={{ fontWeight: '500' }}>{entry.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600' }}>
                      {entry.hours.toFixed(2)} hours
                    </div>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                      {((entry.value / 24) * 100).toFixed(1)}% of day
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px', color: '#6B7280' }}>
          <p>No events scheduled for this day.</p>
          <p>Go to the calendar to add some events!</p>
        </div>
      )}
    </main>
  );
}
```

**Understanding the Key Parts:**

1. **calculateTimeBreakdown Function:**
   - Filters events for selected day
   - Calculates hours per event type
   - Adds "Empty Time" for unscheduled hours
   - Returns data in format Recharts needs

2. **Date Filtering:**
   ```javascript
   const isSameDay = (date1, date2) => {
     return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
   };
   ```
   - Can't use `===` on dates (they're objects)
   - Must compare year, month, and day separately

3. **Time Calculation:**
   ```javascript
   const hours = (end - start) / (1000 * 60 * 60);
   ```
   - Date subtraction gives milliseconds
   - 1000 ms = 1 second
   - 60 seconds = 1 minute
   - 60 minutes = 1 hour
   - So divide by (1000 * 60 * 60)

4. **Recharts Structure:**
   ```javascript
   <PieChart>
     <Pie data={chartData} dataKey="value">
       {chartData.map((entry, index) => (
         <Cell key={`cell-${index}`} fill={entry.color} />
       ))}
     </Pie>
   </PieChart>
   ```
   - `data` = array of data points
   - `dataKey` = which field to use for size ("value" = hours)
   - `Cell` = individual slices (we set colors here)
   - `Legend` = shows labels at bottom
   - `Tooltip` = shows details on hover

---

### Step 6.3: Test Stats Page

**Testing Steps:**

1. Go to calendar page
2. Create several events of different types for **today's date**
   - Example: Work event 9am-12pm (3 hours)
   - Example: School event 1pm-3pm (2 hours)
   - Example: Meal event 6pm-7pm (1 hour)
3. Click on "Stats" in the navigation
4. Should see pie chart with breakdown
5. Should see:
   - Work slice in blue (3 hours, 12.5%)
   - School slice in green (2 hours, 8.3%)
   - Meal slice in orange (1 hour, 4.2%)
   - Empty Time in gray (18 hours, 75%)
6. Hover over slices to see tooltips
7. Check detailed breakdown list below chart
8. Change date picker to tomorrow
9. Should show "No events scheduled for this day"
10. Change back to today
11. Chart should reappear

**Common Issues:**

- **Chart doesn't show:**
  - Check console logs
  - Verify events exist for selected date
  - Make sure events have EventTypeId field
- **Wrong colors:**
  - Check eventTypes is loaded from localStorage
  - Verify event type colors match
- **Wrong times:**
  - Check time calculation logic
  - Verify StartTime and EndTime are Date objects
- **Events not loading:**
  - Open Application tab in DevTools
  - Check Local Storage has foundationEvents
  - Verify JSON is valid

---

## Testing & Debugging

### Using Console Logs Effectively

**Good logging practices:**

```javascript
// Log what's happening
console.log('Loading events...');

// Log the actual data
console.log('Events loaded:', events);

// Log before and after state changes
console.log('Before update:', events);
setEvents(newEvents);
console.log('After update:', newEvents);

// Log in event handlers
const handleClick = () => {
  console.log('Button clicked!');
};
```

---

### Using React DevTools

1. Install React DevTools browser extension:
   - Chrome: Search "React Developer Tools" in Chrome Web Store
   - Firefox: Search in Firefox Add-ons
2. Open DevTools (F12 or right-click → Inspect)
3. Click "Components" tab (new tab from React DevTools)
4. Click on a component (e.g., "Cal")
5. Right panel shows all its state and props
6. Can even edit state to test!
7. Click "Profiler" tab to see performance

---

### Using Browser DevTools for localStorage

1. Open DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Local Storage" in left sidebar
4. Click on your site (e.g., localhost:5173)
5. See all stored data:
   - `foundationEvents` - your calendar events
   - `foundationEventTypes` - your event types
6. Can click on values to see full JSON
7. Can right-click to delete and test "empty state"

---

### Common Errors and Solutions

**1. "Cannot read property 'map' of undefined"**
- **Problem:** Trying to `.map()` on undefined
- **Solution:** Initialize state as empty array `useState([])`
- **Or add check:** `{events && events.map(...)}`

**2. "Objects are not valid as a React child"**
- **Problem:** Trying to render an object directly
- **Solution:** Render specific properties: `{event.Subject}`
- **Not:** `{event}` ❌

**3. "Each child in a list should have a unique key prop"**
- **Problem:** Forgetting `key` in `.map()`
- **Solution:** `events.map(evt => <div key={evt.Id}>...)`

**4. State not updating**
- **Problem:** Might be mutating state directly
- **Solution:** Always create new arrays/objects
- **Use:** `[...events, newEvent]` or `.map()` / `.filter()`
- **Not:** `events.push(newEvent)` ❌

**5. localStorage not saving**
- **Problem:** useEffect not running
- **Solution:** Check dependency array includes the state variable
- **Correct:** `useEffect(() => {...}, [events])`

**6. Dates showing as strings**
- **Problem:** Not converting after loading from localStorage
- **Solution:** Use `.map()` to convert strings to Date objects:
  ```javascript
  const eventsWithDates = parsed.map(e => ({
    ...e,
    StartTime: new Date(e.StartTime),
    EndTime: new Date(e.EndTime)
  }));
  ```

**7. Modal won't close**
- **Problem:** Click event propagating
- **Solution:** Use `e.stopPropagation()` on inner div

**8. Syncfusion not showing events**
- **Problem:** Wrong field names
- **Solution:** Check `eventSettings.fields` mapping matches your data

---

### Final Checklist

**Calendar:**
- [ ] Can create events with different types
- [ ] Events show with correct colors (blue for Work, green for School, etc.)
- [ ] Can edit events (change type, title, time, notes)
- [ ] Can delete events with confirmation
- [ ] Events persist after page refresh
- [ ] Can click on empty time slot to create event
- [ ] Can click on existing event to edit
- [ ] Console has no errors

**Stats:**
- [ ] Pie chart shows time breakdown
- [ ] Can change selected date
- [ ] Empty time is calculated correctly (24 - scheduled hours)
- [ ] Chart uses event type colors
- [ ] Legend shows correctly
- [ ] Detailed breakdown shows hours and percentages
- [ ] Shows "no events" message when day is empty
- [ ] Tooltips work on hover

**Code Quality:**
- [ ] No console errors (red text)
- [ ] Console logs are helpful for debugging
- [ ] Proper indentation
- [ ] No unused variables (VS Code shows gray underline)

---

## What You've Learned

### React Concepts Mastered

1. **useState - Managing State**
   - Primitive values: strings, numbers, booleans
   - Arrays: events, event types
   - Objects: selected event, form data
   - Multiple state variables in one component

2. **useEffect - Side Effects**
   - Running code on component mount (`[]` dependency)
   - Running code when state changes (`[events]` dependency)
   - Understanding when effects run
   - Synchronizing with external systems (localStorage)

3. **Props - Component Communication**
   - Passing data from parent to child
   - Passing functions as props (callbacks)
   - Destructuring props
   - Optional chaining (`eventType?.color`)

4. **Event Handling**
   - onClick, onChange, onSubmit
   - Preventing default behavior (`e.preventDefault()`)
   - Event bubbling and `stopPropagation()`
   - Accessing event data (`e.target.value`)

5. **Conditional Rendering**
   - Early returns: `if (!isOpen) return null;`
   - Ternary operators: `{condition ? <A /> : <B />}`
   - && operator: `{isEditing && <DeleteButton />}`

6. **Lists and Keys**
   - Using `.map()` to render lists
   - Why keys are important (React's reconciliation)
   - Using unique IDs as keys

7. **Forms in React**
   - Controlled components (value + onChange)
   - Form validation
   - Form submission handling
   - Multiple form fields

### Syncfusion Concepts Mastered

1. **ScheduleComponent Setup**
   - Basic configuration
   - Importing required modules
   - License registration
   - View configuration (Day view)

2. **Event Handling**
   - `popupOpen` event for intercepting editor
   - Canceling default behavior (`args.cancel = true`)
   - Detecting create vs edit (`args.data.Id`)

3. **Data Binding**
   - `eventSettings.dataSource` for events array
   - Field mapping for custom data structure
   - Dynamic updates when state changes

4. **Data Structure**
   - Required fields: Id, Subject, StartTime, EndTime
   - Custom fields: EventTypeId, Notes, Color
   - Date objects vs strings

### General Programming Concepts

1. **localStorage API**
   - Saving data: `localStorage.setItem(key, value)`
   - Loading data: `localStorage.getItem(key)`
   - JSON serialization: `JSON.stringify()`, `JSON.parse()`
   - Understanding string-only storage

2. **Date Manipulation**
   - Creating Date objects
   - Formatting for different uses
   - Comparing dates
   - Calculating durations
   - Converting between formats

3. **Component Architecture**
   - Separating concerns (presentational vs container)
   - Reusable components
   - Parent-child communication patterns
   - Lifting state up

4. **Array Methods**
   - `.map()` for transforming arrays
   - `.filter()` for removing items
   - `.reduce()` for calculations
   - Spread operator `[...]` for immutability

5. **Debugging Techniques**
   - Console logging strategically
   - Using browser DevTools
   - Inspecting localStorage
   - Using React DevTools

---

## Next Steps (After Deadline)

Want to keep learning? Try these enhancements:

### Easy Enhancements (1-2 hours each):

1. **Add More Event Types**
   - Create UI to add custom types
   - Color picker for custom colors
   - Edit/delete event types

2. **Improve Validation**
   - Prevent end time before start time
   - Show error messages in forms
   - Highlight invalid fields

3. **Better UX**
   - Loading spinner while data loads
   - Success message after save
   - Better mobile styling

### Medium Enhancements (2-4 hours each):

4. **Week/Month Views**
   - Add Week and Month to ViewsDirective
   - Update stats to show weekly breakdown
   - Add date range selector

5. **Timeline Page**
   - List events chronologically
   - Filter by event type
   - Group by date

6. **Search & Filter**
   - Search events by title
   - Filter calendar by type
   - Date range filtering

### Advanced Enhancements (4+ hours):

7. **Backend Integration**
   - Replace localStorage with API calls
   - User authentication
   - Multi-device sync

8. **Drag & Drop**
   - Enable dragging events to new times
   - Syncfusion supports this natively
   - Update state when moved

9. **Recurring Events**
   - Support repeating events
   - Syncfusion has built-in recurrence
   - UI for recurrence rules

---

## Getting Help

**When you're stuck:**

1. **Read the error message carefully**
   - Often tells you exactly what's wrong
   - Note the file name and line number
   - Click on the error to jump to the code

2. **Check the browser console**
   - Look for errors (red text)
   - Check your console.logs
   - See network requests (Network tab)

3. **Use React DevTools**
   - Inspect component state
   - See what props components receive
   - Check if state is updating

4. **Check localStorage**
   - Application tab in DevTools
   - See what's actually saved
   - Verify JSON format

5. **Simplify to find the problem**
   - Comment out code until it works
   - Add one piece back at a time
   - Find where it breaks

6. **Google the exact error message**
   - Copy the full error
   - Add "react" to your search
   - Stack Overflow usually has answers
   - Check recent answers (React changes fast)

7. **Check Syncfusion docs**
   - Search for specific props/events
   - Look at code examples
   - Try their demos

---

## Tips for Success

1. **Work incrementally**
   - Do one phase at a time
   - Test after each step
   - Don't move on if something's broken

2. **Use console.log liberally**
   - Log state before and after changes
   - Log in event handlers
   - Remove logs before submitting

3. **Save often**
   - Use Cmd/Ctrl+S frequently
   - Browser auto-refreshes (Vite)
   - Git commit after each working phase

4. **Don't be afraid to experiment**
   - Try changing values
   - See what breaks
   - Learn by doing

5. **Take breaks**
   - Step away if stuck
   - Fresh eyes help
   - Don't code tired

---

## Good Luck!

You've got this! Remember:
- Take it one phase at a time
- Test frequently
- Use console.log liberally
- Read error messages carefully
- Don't be afraid to ask for help
- Mistakes are how you learn

The goal isn't just to finish the assignment - it's to **understand** React and how to work with third-party libraries. Take your time with each concept, and you'll be building React apps like a pro!

If you get stuck on a specific part, re-read that section slowly, look at the code examples, and try to understand WHY it works that way, not just WHAT it does.

**You're learning valuable skills that will apply to any React project you build in the future!**
 