import React from 'react';
import { NavLink } from "react-router-dom";

export function HeaderMain() {
  return (
    <header>
        <nav className="grid-container">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/library">Question Submissions</NavLink>
        </nav>
        <br />
        <nav>
            <p>Temporary Links:<br />
            <NavLink className="nav-link" to="/waiting">Waiting</NavLink>
            <NavLink className="nav-link" to="/game">Game</NavLink>
            <NavLink className="nav-link" to="/scoreboard">Scoreboard</NavLink>
            </p>
        </nav>
        <br />
        <h1>FAMILY GAME NIGHT</h1>
        <p><i>A Family Feud Inspired Application</i></p>
    </header>
  );
}