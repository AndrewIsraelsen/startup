import React from 'react';
import './login.css';

export function Login() {
  return (
        <main class="body">
            <h2 class="fw-bold">Login</h2>
            <div>
            <span>Username</span>
            <input type="text" placeholder="johnsmith@email.com" />
            </div>
            <div>
            <span>Password</span>
            <input type="password" placeholder="password" />
            </div>
            <div id="button">
                <a href="calendar.html" class="btn btn-primary" role="button">Login</a>
                <a href="calendar.html" class="btn btn-primary" role="button">Create</a>
            </div>
        </main>
  );
}