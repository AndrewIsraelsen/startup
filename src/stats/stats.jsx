import React from 'react';
import './stats.css';

export function Stats() {
  return (
        <main>
          <h1>Sept 24</h1>

          <h3>Today, You spent your time like this:</h3>
          <div>
              <div>School - 3hr</div>
              <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar text-bg-success" style={{width: '12.5%'}}>3hr</div>
              </div>
              <div>Sleep - 8hr</div>
              <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar text-bg-info" style={{width: '33%'}}>8hr</div>
              </div>
              <div>Travel - 1hr</div>
              <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar text-bg-warning" style={{width: '4%'}}>1hr</div>
              </div>
              <div>Work - 4hr</div>
              <div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar text-bg-danger" style={{width: '16.6%'}}>4hr</div>
              </div>
              <div>Relax - 1hr</div>
              <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{width: '4%'}}>1hr</div>
              </div>
              <div>Relationships - 2hr</div>
              <div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{width: '8%'}}>2hr</div>
              </div>
              <div>Undefined - 5hr</div>
              <div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-info" style={{width: '21%'}}>5hr</div>
              </div>

          </div>
          
          <h3>Friend updates (websocket powered):</h3>
          <div>

              <div>John hit 4 hours on excercise this week!</div>
              <div>Tim is almost at his goal of 3 hours of study, encourage him!</div>
              <div>Bill reached 8 hours of sleep last night!</div>

          </div>

        </main>
  );
}