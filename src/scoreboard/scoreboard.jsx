import React from 'react';
import "../app.css";

export function Scoreboard() {
  return (
    <main>
        <h1>SCOREBOARD (Websocket Placeholder)</h1>
        <div className="score-container">
            <div className="gray-scoreboard">
                <h2>Team A</h2><h4>150</h4>
            </div>
            <div className="gray-scoreboard">
                <h2>Team B</h2><h4>120</h4>
            </div>
        </div>
        <br />
        <h3>Question: (Database Placeholder)</h3>
        <table>
            <tr>
                <td className="answer">Answer 1</td>
                <td className="points">50</td>
                <td className="answer">Answer 5</td>
                <td className="points">10</td>
            </tr>
            <tr>
                <td className="answer">Answer 2</td>
                <td className="points">30</td>
                <td className="answer">Answer 6</td>
                <td className="points">5</td>
            </tr>
            <tr>
                <td className="answer">Answer 3</td>
                <td className="points">20</td>
                <td className="answer">Answer 7</td>
                <td className="points">3</td>
            </tr>
            <tr>
                <td className="answer">Answer 4</td>
                <td className="points">15</td>
                <td className="answer">Answer 8</td>
                <td className="points">1</td>
            </tr>
        </table>
        <br />
        <input type="button" id="button" value="Ready for Next Round" />
    </main>
  );
}