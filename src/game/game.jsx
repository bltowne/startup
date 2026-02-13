import React from 'react';
import "../app.css";

export function Game() {
  return (
    <main>
        <h2>You have 30 seconds to answer!</h2>
        <br />
        <h1>24</h1>
        <br />
        <div className="answer-container">
            <h3>Question? (Database Placeholder)</h3>
            <br />
            <form>
                <input type="text" placeholder="Enter answer"/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </main>
  );
}