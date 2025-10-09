import React from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
  return (
        <main className="body">
            <h2 className="fw-bold">Login</h2>
            <div>
            <span>Username</span>
            <input type="text" placeholder="johnsmith@email.com" />
            </div>
            <div>
            <span>Password</span>
            <input type="password" placeholder="password" />
            </div>
            <div id="button">
                <NavLink to="/calendar" className="btn btn-primary" role="button">Login</NavLink>
                <NavLink to="/calendar" className="btn btn-primary" role="button">Create</NavLink>
            </div>
        </main>
  );
}