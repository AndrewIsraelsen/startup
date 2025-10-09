import React from 'react';
import './timeline.css';

export function Timeline() {
  return (
    <main>
      <h1>Timeline</h1>

      <div className="container-fluid py-5">
        <h3 className="text-center mb-4">CS260 Timeline</h3>

        <div className="text-center mb-4">
          <button className="btn btn-outline-secondary rounded-circle timeline-button">+</button>
        </div>

        <div className="timeline-container">

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 24 - Class
            </div>
          </div>

          <div className="timeline-divider"></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 23 - Homework 1hr
            </div>
          </div>

          <div className="timeline-divider"></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 22 - Class
            </div>
          </div>

          <div className="timeline-divider"></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 19 - Homework
            </div>
          </div>

          <div className="timeline-divider"></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 18 - Study Session
            </div>
          </div>

          <div className="timeline-divider"></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 17 - Class
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}