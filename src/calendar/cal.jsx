import React from 'react';
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

registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1JFaF1cX2hIfkx0TXxbf1x1ZFREal9RTnRWUiweQnxTdEBiWX1fcHRWRmJVV0N3WkleYg=="
);

const data = [
    {
        Id: 1,
        Subject: "Sales Presentation",
        StartTime: new Date(2025, 1, 11, 10, 0),
        EndTime: new Date(2025, 1, 11, 12, 30),
        IsAllDay: false,
    },
    {
        Id: 2,
        Subject: "New Budget Report",
        StartTime: new Date(2025, 1, 10, 10, 0),
        EndTime: new Date(2025, 1, 10, 12, 30),
        IsAllDay: true,
        Status: "Completed",
        Priority: "High",
    },
];


export function Cal() {
    return <main className="flex justify-center items-center">
        <ScheduleComponent 
            width={400}
            height={500}

            eventSettings={{
            dataSource: data

        }}>
            <ViewsDirective>
                <ViewDirective option="Day" />
            </ViewsDirective>
            <Inject services={[Day]} />
        </ScheduleComponent>
    </main>

}