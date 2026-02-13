import React from 'react';
import "../app.css";

export function Home() {
  return (
    <main>
        <h2>Welcome to Family Game Night!</h2>
        <div className="gray-html">
            <h3>Start a New Game</h3>
            <form method="get" action="waiting.html">
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
        <br />
        <div className="gray-html">
            <h3>Join an Existing Game</h3>
            <form method="get" action="waiting.html">
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
                <br />
                <input type="text" id="gamecode" name="gamecode" placeholder="Enter Family Game Code" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </main>
  );
}