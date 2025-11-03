import React from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import Button from 'react-bootstrap/Button';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


export function Login() {




  return (
        <main className="login-main">
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
                <Button onClick={() => loginUser()} className="btn btn-primary">Login</Button>
                <Button onClick={() => createUser()} className="btn btn-secondary">Create</Button>
            </div>

            

        </main>
  );
}