import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useWS } from '../ws/WebSocketContext';

export function Scoreboard({ user }) {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('data'));
    const answers = JSON.parse(localStorage.getItem('lastRoundAnswers')) || [];
    const scores = JSON.parse(localStorage.getItem('totalScores')) || [];
    const myAnswerObject = answers.find(a => a.player === user);
    const myAnswer = myAnswerObject ? myAnswerObject.answer : "";
    const oppAnswerObject = answers.find(a => a.player !== user);
    const oppName = oppAnswerObject ? oppAnswerObject.player : "Opponent";
    const oppAnswer = oppAnswerObject ? oppAnswerObject.answer : "";

    const highlight = {
        backgroundColor: "lightgreen",
    };

    const opponentHighlight = {
        backgroundColor: "lightcoral"
    };

    function getQuestion() {
        return data?.question || "Loading question...";
    }

    function getAnswer(i) {
        return data?.answers[i] || "";
    }

    function getPoints(i) {
        return data?.points[i] || 0;
    }

    function highlightAnswer(i) {
        if (myAnswer === getAnswer(i)) {
            return highlight;
        }
        return {};
    }

    function highlightOpponentAnswer(i) {
        if (oppAnswer === getAnswer(i)) {
            return opponentHighlight;
        }
        return {};
    }

    const { send } = useWS();

    function handleReady() {
        navigate('/waiting');
        send({ type: 'ready' });
    }

    function handleLogout() {
        send({ type: 'logout' });
        window.location.href = '/';
    }

    return (
        <main>
            <h1>SCOREBOARD</h1>
            <div className="score-container">
                <div className="gray-scoreboard" style={{ border: "4px solid green" }}>
                    <h2>{user}</h2><h4>{scores[user]}</h4>
                </div>
                <div className="gray-scoreboard" style={{ border: "4px solid red" }}>
                    <h2>{oppName}</h2><h4>{scores[oppName]}</h4>
                </div>
            </div>
            <br />
            <h3>Question: {getQuestion()}</h3>
            <table>
                <tbody>
                    <tr>
                        <td className="answer" style={{ ...highlightAnswer(0), ...highlightOpponentAnswer(0) }}>{getAnswer(0)}</td>
                        <td className="points" style={{ ...highlightAnswer(0), ...highlightOpponentAnswer(0) }}>{getPoints(0)}</td>
                        <td className="answer" style={{ ...highlightAnswer(4), ...highlightOpponentAnswer(4) }}>{getAnswer(4)}</td>
                        <td className="points" style={{ ...highlightAnswer(4), ...highlightOpponentAnswer(4) }}>{getPoints(4)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer" style={{ ...highlightAnswer(1), ...highlightOpponentAnswer(1) }}>{getAnswer(1)}</td>
                        <td className="points" style={{ ...highlightAnswer(1), ...highlightOpponentAnswer(1) }}>{getPoints(1)}</td>
                        <td className="answer" style={{ ...highlightAnswer(5), ...highlightOpponentAnswer(5) }}>{getAnswer(5)}</td>
                        <td className="points" style={{ ...highlightAnswer(5), ...highlightOpponentAnswer(5) }}>{getPoints(5)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer" style={{ ...highlightAnswer(2), ...highlightOpponentAnswer(2) }}>{getAnswer(2)}</td>
                        <td className="points" style={{ ...highlightAnswer(2), ...highlightOpponentAnswer(2) }}>{getPoints(2)}</td>
                        <td className="answer" style={{ ...highlightAnswer(6), ...highlightOpponentAnswer(6) }}>{getAnswer(6)}</td>
                        <td className="points" style={{ ...highlightAnswer(6), ...highlightOpponentAnswer(6) }}>{getPoints(6)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer" style={{ ...highlightAnswer(3), ...highlightOpponentAnswer(3) }}>{getAnswer(3)}</td>
                        <td className="points" style={{ ...highlightAnswer(3), ...highlightOpponentAnswer(3) }}>{getPoints(3)}</td>
                        <td className="answer" style={{ ...highlightAnswer(7), ...highlightOpponentAnswer(7) }}>{getAnswer(7)}</td>
                        <td className="points" style={{ ...highlightAnswer(7), ...highlightOpponentAnswer(7) }}>{getPoints(7)}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <input type="button" id="button" value="Ready for Next Round" onClick={handleReady} />    <input type="button" id="button" value="Logout" onClick={handleLogout} />
        </main>
    );
}