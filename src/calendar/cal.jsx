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
import { DEFAULT_EVENT_TYPES } from '../shared/eventTypes';

export function Cal() {
    registerLicense(
        "Ngo9BigBOggjHTQxAR8/V1JFaF1cX2hIfkx0TXxbf1x1ZFREal9RTnRWUiweQnxTdEBiWX1fcHRWRmJVV0N3WkleYg=="
    );

    // States: 
    
    // vent Types
    const [eventTypes, setEventTypes] = useState([]);

    // Cal Events
    const [events, setEvents] = useState([]);


    // Effect Hooks:

    // Update event types
    useEffect(() => {
        console.log('Loading event types from localStorage...');

        const savedTypes = localStorage.getItem('storedEventTypes');
        if (savedTypes) {
            console.log('Found saved event types:', savedTypes);
            setEventTypes(JSON.parse(savedTypes));
        } else {
            console.log('No saved types found, using defaults');
            setEventTypes(DEFAULT_EVENT_TYPES);
        }
    }, []);

    // Save event types to local storage everytime they're changed
    useEffect(() => {
        if (eventTypes.length > 0) {
            console.log('saving event types to localStorage;', eventTypes);
            localStorage.setItem('storedEventTypes', JSON.stringify(eventTypes));
        }
    }, [eventTypes]);
    
    // Load Events from local Storage
    useEffect(() => {
        console.log('Loading events from localStorage...');
        
        const savedEvents = localStorage.getItem('storedEvents');

        if(savedEvents){
            console.log('Found calendar events in storage:', savedEvents);
            const parsedEvents = JSON.parse(savedEvents);

            // convert JSON into date objects
            const eventsObject = parsedEvents.map(event => ({
                ...event,
                StartTime: new Date(event.StartTime),
                EndTime: new Date(event.EndTime)
            }));

            console.log('Loaded events:', eventsObject);
            setEvents(eventsObject)
        }
    }, []);

    // Save events to localStorage when they change
    useEffect(() => {
        console.log('Saving calendar events to local storage', events)
        localStorage.setItem('storedEvents', JSON.stringify(events));
    }, [events]);

    

    // Add dropdown for eventTypes to syncfusion form
    const onPopupOpen = (args) => {
        // Modify just the event editor popup, not others
        if (args.type === 'Editor') {
            // Wait for editor to render
            setTimeout(() => {
                const formElement = args.element.querySelector('.e-schedule-form');

                if (formElement && !document.getElementById('EventTypeId')) {
                    // HTML for event drop down
                    const eventTypeDropDown = document.createElement('div');
                    eventTypeDropDown.className = 'e-schedule-form-row';
                    eventTypeDropDown.style.marginBottom = '20px';
                    eventTypeDropDown.innerHTML = `
                        <div style = "width:100%;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 200; color: #757575;">Event Types</label>
                            
                            <select
                                id="EventTypeId"
                                name="EventTypeId"
                                class="e-field e-input"
                                style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;"
                            >
                                ${eventTypes.map (type =>
                                    `<option value="${type.id}">${type.name}</option>`
                                ).join('')}
                            </select>
                        <div/>
                    `;

                    formElement.insertBefore(eventTypeDropDown, formElement.firstChild);

                    // If editing an existing event, fill in the event type with what it is
                    const eventGetType = document.getElementById('EventTypeId');
                    if (args.data.EventTypeId) {
                        eventGetType.value = args.data.EventTypeId;
                        console.log("baba", args.data.EventTypeId);
                    } else {
                        // Set default to 'other' for new events
                        eventGetType.value = 'other';


                    }
                }
            }, 0);
        }
    };


    // Use our own "CRUD" system instead of Sync fusion so that we can handle event types

    const onActionBegin = (args) => {
        console.log('Action beginning:', args.requestType);

        if (args.requestType == 'eventCreate' || args.requestType == 'eventChange' || args.requestType == 'eventRemove' ) {
            // Don't use their "CRUD" systems
            args.cancel = true;
        }

        if (args.requestType == 'eventCreate') {
            // Get event data
            const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

            // Validate that event type was selected
            if (!eventData.EventTypeId) {
            alert('Please select an event type');
            console.log(eventData);
            return; // Stop the event creation
            }

            // Find event type to get give color
            const eventType = eventTypes.find(t => t.id == eventData.EventTypeId)

            // Add color to event
            const eventWithColor = {
                ...eventData,
                // Unique ID based on milliseconds 
                Id: Date.now(),
                Color: eventType?.color
            };

            console.log('Creating event:', eventWithColor);

            // Add new event to our our Event state
            setEvents([...events, eventWithColor]);
        } else if (args.requestType == 'eventChange') {
            // Get event data
            const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

            // Find event type to get its color
            const eventType = eventTypes.find(t => t.id == eventData.EventTypeId);

            // Add color to event
            const eventWithColor = {
                ...eventData,
                Color: eventType?.color
            };

            console.log('Updating event:', eventWithColor);

            // Update existing event
            setEvents(events.map(evt =>
                evt.Id == eventWithColor.Id ? eventWithColor : evt
            ));
        } else if (args.requesetType == 'eventRemove') {
            //Delete event
            const eventData = Array.isArray(args.data) ? args.data[0] : args.data;
            
            console.log('Deleting event:', eventData.Id);

            setEvents(events.filter(evt => evt.Id !== eventData.Id));
        }



    }
    
    
    return (
    <main className="flex justify-center items-center min-h-screen">
        <ScheduleComponent 
            showQuickInfo={false}
            selectedDate={new Date()}
            eventSettings={{
                dataSource: events,
                fields: {
                    id: 'Id',
                    subject: { name: 'Subject' },
                    startTime: { name: 'StartTime' },
                    endTime: {name: 'EndTime' },
                    description: { name: 'Description'},
                    eventTimeId: { name: 'EventTypeId' }
                }

            }}
            popupOpen={onPopupOpen}
            actionBegin={onActionBegin}
            eventRendered={(args) => {
                if (args.data.Color) {
                    args.element.style.backgroundColor = args.data.Color;
                }
            }}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
            </ViewsDirective>
            <Inject services={[Day]} />
        </ScheduleComponent>
    </main>
    );
}