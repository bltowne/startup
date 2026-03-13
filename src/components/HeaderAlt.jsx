import React from 'react';
import { NavLink } from "react-router-dom";

export function HeaderAlt() {
  const [user, setUser] = React.useState(null);
  const [gameCode, setGameCode] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/user')
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      });
    fetch('/api/code')
      .then((response) => response.json())
      .then((code) => {
        setGameCode(code);
      });
  }, []);

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