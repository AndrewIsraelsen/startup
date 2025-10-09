import React from 'react';


export function Timeline() {
  return (
    <main>
      <h1>Timeline</h1>

      <div class="container py-5">
        <h3 class="text-center mb-4">CS260 Timeline</h3>
        
        <div class="text-center mb-4">
          <button class="btn btn-outline-secondary rounded-circle" style="width: 40px; height: 40px;">+</button>
        </div>

        <div style="max-width: 400px; margin: 0 auto;">
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 24 - Class
            </div>
          </div>
          
          <div style="border-left: 2px dotted #ccc; height: 20px; margin: 0 auto; width: 0;"></div>
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 23 - Homework 1hr
            </div>
          </div>
          
          <div style="border-left: 2px dotted #ccc; height: 20px; margin: 0 auto; width: 0;"></div>
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 22 - Class
            </div>
          </div>
          
          <div style="border-left: 2px dotted #ccc; height: 20px; margin: 0 auto; width: 0;"></div>
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 19 - Homework
            </div>
          </div>
          
          <div style="border-left: 2px dotted #ccc; height: 20px; margin: 0 auto; width: 0;"></div>
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 18 - Study Session
            </div>
          </div>
          
          <div style="border-left: 2px dotted #ccc; height: 20px; margin: 0 auto; width: 0;"></div>
          
          <div class="text-center mb-2">
            <div class="border rounded p-2">
              Sept 17 - Class
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}