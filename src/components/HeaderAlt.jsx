import React from 'react';
import { NavLink } from "react-router-dom";

export function HeaderAlt( { user , gameCode } ) {
  return (
    <header>
        <nav className="grid-container">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/library">Question Submissions</NavLink>
        </nav>
        <br />
        <div className="grid-container">
            <p>Username:<br />{user}</p>
            <p>Family Game Code:<br />{gameCode}</p>
        </div>
    </header>
  );
}