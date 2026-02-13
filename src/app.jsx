import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AltLayout } from './layouts/AltLayout';
import { Home } from './home/home';
import { Waiting } from './waiting/waiting';
import { Game } from './game/game';
import { Library } from './library/library';
import { Scoreboard } from './scoreboard/scoreboard';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">

            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                </Route>
                <Route element={<AltLayout />} >
                    <Route path="/waiting" element={<Waiting />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                </Route>
            </Routes>

            <footer>
                <p className="grid-container">Created by Bree Towne<a href="https://github.com/bltowne/startup.git">GitHub</a></p>
            </footer>
        </div>
    </BrowserRouter>
  );
}