import React from 'react';
import "../app.css";

export function Waiting() {
  return (
    <main>
        <h1>WAITING FOR OTHER PLAYERS</h1>
        <h4><i>If you haven't already, share the Family Game Code with someone else so they can join your game!</i></h4>
        <br />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNjoC9122qU7rOuPhqvmegbqfTOMQ6H4sKw&s" alt="Tick Tock" />
        <br />
        <h2>Trivia while you wait?</h2>
        <p className="answer-container">Trivia API Placeholder</p>
    </main>
  );
}