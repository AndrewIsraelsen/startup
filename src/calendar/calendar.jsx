import React from 'react';
import './calendar.css';

export function Calendar() {
  return (
        <main className="calendar-main">

        <ul className="days">
            <li>SUN 11</li>
            <li>MON 12</li>
            <li>TUE 13</li>
            <li>WED 14</li>
            <li>THU 15</li>
            <li>FRI 16</li>
            <li>SAT 17</li>
        </ul>


        <hr />

        


        <div className="calendar-container" id="cal">
            <div className="container-fluid">
            
            
            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">ALL-DAY</div>
                <div className="col-10 p-2">National Holiday (grabbed from 3rd party service)</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center"></div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">8:00 AM</div>
                <div className="col-10 p-2">Breakfast</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">9:00 AM</div>
                <div className="col-10 p-2">Travel</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">10:00 AM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">11:00 AM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">12:00 PM</div>
                <div className="col-10 p-2">Lunch</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">1:00 PM</div>
                <div className="col-10 p-2">Homework</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">2:00 PM</div>
                <div className="col-10 p-2">CS260</div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">3:00 PM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">4:00 PM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">5:00 PM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">6:00 PM</div>
                <div className="col-10 p-2"></div>
            </div>

            <div className="row border time-row">
                <div className="col-2 bg-light p-2 d-flex align-items-center">7:00 PM</div>
                <div className="col-10 p-2"></div>
            </div>

            </div>
        </div>

        </main>
  );
}