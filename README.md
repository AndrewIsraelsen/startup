# Foundation Calendar

(This is gonna be so super good)

[My Notes](notes.md)

## 🚀 Specification Deliverable

Foundation Calendar is a consumer first calendar. Simplified, Streamlined, Painless.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Foundation Calendar is a consumer first calendar. Many calendars focus on business' as their primary clients and consumers get left by the wayside. Foundation Calendar aims to get rid of the corperate fluff that most consumers never use and to instead be a painless fluid experience for those trying to organize their life. 

### Design

![Design image](design.png)

### Key features

- Login to calendar
- Start creating event with just one short click
- "Type" of event being created is the first thing defined
- Timeline of events for each "Type"
- Simple "normal" calendar features of times, notes, and location
- Day and Month views
- Select Multiple events to move them
- See when friend updates their calendar w/ websocket
- (Stretch feature) See stats of calendar

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Four different views: Calendar, Create Event, Timeline, Stats
- **CSS** - Make it all pretty, especially to aid the flowing painless design
- **React** - Have flexible components that can be reused in different contexts, like calendar events and calendar days
- **Service** - Authentication, third party call to put hollidays into calendar automatically.
- **DB/Login** - Loging into calendar, saving events and data about them.
- **WebSocket** - Updating friends if your calendar has been updated




# ***Below is stuff that came with the repo***

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Created and linked pages index, calendar, stats and timeline
- [x] **Proper HTML element usage** - Used elements for different parts of page appropriately. Especially the consistent nav bar at the bottom will be useful
- [x] **Links** - Linked pages together and to the github
- [x] **Text** - General vibe of each page is contextually visual through the placeholder text
- [x] **3rd party API placeholder** - Holiday placeholder events included to show 3rd party api
- [x] **Images** - Calendar and favicon.ico image included on page
- [x] **Login placeholder** - Login place holder on index.html
- [x] **DB data placeholder** - Placeholder Events on calendar that will be stored in DB
- [x] **WebSocket placeholder** - Stats page shows placeholder of other's calendar stats updates

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Used Bootstrap to make dynamic, clean, consistent page elements
- [x] **Navigation elements** - Included a bottom nav bar, as well as a corner "hamburger menu"
- [x] **Responsive to window resizing** - Used css flex components to be responsive
- [x] **Application elements** - Main calendar that will serve as the core function
- [x] **Application text content** - Still has all previous connections, now with bootstrap being pretty
- [x] **Application images** - Included logo in the flex set ups

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - It's in the new minimized format
- [x] **Components** - It's running on react components
- [x] **Router** - The pages are routed on a single page site

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Calendar is fully implemented, stats webhooks is partial. Timeline and Stats still in progress for now.
- [x] **Hooks** - Used useEffect and useState primarily for calendar data and updating

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Backend is set up with express in index.js
- [x] **Static middleware for frontend** - Frontend is served by express middleware (epic)
- [x] **Calls to third party endpoints** - Call to a free api "https://date.nager.at/" that provides date objects for holidays. US holidays show in calendar now.
- [x] **Backend service endpoints** - Calendar events save to backend with endpoints
- [x] **Frontend calls service endpoints** - saved events from the back end load to calendar and are saved to the back end from the calendar.
- [x] **Supports registration, login, logout, and restricted endpoint** - Calendar has authentication and events show up based on the user.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - Events store persistantly MongoDB and are called by user
- [x] **Stores credentials in MongoDB** - Users are stored in MongoDB.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
