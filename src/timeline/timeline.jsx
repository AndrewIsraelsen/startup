import React from 'react';


export function Timeline() {
  return (
    <main>
      <h1>Timeline</h1>

      <div className="container-fluid py-5">
        <h3 className="text-center mb-4">CS260 Timeline</h3>

        <div className="text-center mb-4">
          <button className="btn btn-outline-secondary rounded-circle" style={{width: '40px', height: '40px'}}>+</button>
        </div>

        <div style={{maxWidth: '600px', margin: '0 auto'}}>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 24 - Class
            </div>
          </div>

          <div style={{borderLeft: '2px dotted #ccc', height: '20px', margin: '0 auto', width: '0'}}></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 23 - Homework 1hr
            </div>
          </div>

          <div style={{borderLeft: '2px dotted #ccc', height: '20px', margin: '0 auto', width: '0'}}></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 22 - Class
            </div>
          </div>

          <div style={{borderLeft: '2px dotted #ccc', height: '20px', margin: '0 auto', width: '0'}}></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 19 - Homework
            </div>
          </div>

          <div style={{borderLeft: '2px dotted #ccc', height: '20px', margin: '0 auto', width: '0'}}></div>

          <div className="text-center mb-2">
            <div className="border rounded p-2">
              Sept 18 - Study Session
            </div>
          </div>

          <div style={{borderLeft: '2px dotted #ccc', height: '20px', margin: '0 auto', width: '0'}}></div>

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