import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { Stats } from './stats/stats';
import { Timeline } from './timeline/timeline';

export default function App() {
  return (
    <BrowserRouter>
        <div className = "body">
            <header>
                <nav className="navbar bg-light fixed-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <a id="date" className="navbar-brand ms-2" href="#">Sept 24</a>
                        <a className="navbar-brand position-absolute top-50 start-50 translate-middle" href="#"><img src="Foundation Calendar.png" alt="Foundation Calendar" style={{height: '50px'}}/></a>
                        <a className="navbar-brand ms-auto" href="#">Foundation Calendar</a>
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Foundation Calendar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/index.html">Logout</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="stats.html">Stats</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/stats' element={<Stats />} />
                <Route path='/timeline' element={<Timeline />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <nav className="nav nav-pills nav-fill">
                <a className="nav-link" href="stats.html">Stats</a>
                <a className="nav-link active" aria-current="page" href="calendar.html">Calendar</a>
                <a className="nav-link" href="timeline.html">Timeline</a>
            </nav>


            <footer className="p-2 bg-dark text-white">
            <p id="footername">Andrew Earl Israelsen &copy;</p>
            <a href="https://github.com/AndrewIsraelsen/startup"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
    </svg></a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}