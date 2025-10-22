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
    
    // Event Type State
    const [eventTypes, setEventTypes] = useState([]);

    // Update event types
    useEffect(() => {
        console.log('Loading event types from localStorage...');

        const savedTypes = localStorage.getItem('foundationEventTypes');
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
            localStorage.setItem('foundationEventTypes', JSON. stringify(eventTypes));
        }
    }, [eventTypes]);
    
    
    
    
    
    
    return <main className="flex justify-center items-center min-h-screen">
        <ScheduleComponent 
            width={400}
            height={500}

            eventSettings={{

        }}>
            <ViewsDirective>
                <ViewDirective option="Day" />
            </ViewsDirective>
            <Inject services={[Day]} />
        </ScheduleComponent>
    </main>

}