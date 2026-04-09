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

    // const [currentScore, setCurrentScore] = React.useState(() => {
    //     const score = JSON.parse(localStorage.getItem('currentScore'));
    //     return score || 0;
    // });

    // const [opponentScore, setOpponentScore] = React.useState(() => {
    //     const score = JSON.parse(localStorage.getItem('opponentScore'));
    //     return score || 0;
    // });

    const highlight = {
        backgroundColor: "lightgreen",
    };

    const opponentHighlight = {
        backgroundColor: "lightcoral"
    };

    // const [opponentHighlightIndex, setOpponentHighlightIndex] = React.useState(null);

    // React.useEffect(() => {
    //     fetch('/api/data')
    //         .then((response) => response.json())
    //         .then((fetchedData) => {
    //             setData(fetchedData);
    //         });
    // }, []);

    // React.useEffect(() => {
    //     if (!data) return;
    //     if (myAnswer) {
    //         for (let i = 0; i < data.answers.length; i++) {
    //             if (myAnswer.toLowerCase() === data.answers[i].toLowerCase()) {
    //                 const points = parseInt(data.points[i]);
    //                 setCurrentScore(prevScore => {
    //                     const newScore = prevScore + points;
    //                     localStorage.setItem('currentScore', JSON.stringify(newScore));
    //                     return newScore;
    //                 });
    //                 return;
    //             }
    //         }
    //     }
    //     if (oppAnswer) {
    //         for (let i = 0; i < data.answers.length; i++) {
    //             if (oppAnswer.toLowerCase() === data.answers[i].toLowerCase()) {
    //                 const points = parseInt(data.points[i]);
    //                 setOpponentScore(prevScore => {
    //                     const newScore = prevScore + points;
    //                     localStorage.setItem('opponentScore', JSON.stringify(newScore));
    //                     return newScore;
    //                 });
    //             }
    //         }
    //     }
    // }, [data, myAnswer, oppAnswer]);

    // React.useEffect(() => {
    //     if (!data[index]) return;

    //     const timer = setTimeout(() => {
    //         let newIndex = 5;
    //         if (newIndex === index) {
    //             newIndex = (newIndex + 1);
    //         }
    //         setOpponentHighlightIndex(newIndex);
    //         const points = parseInt(data[index].points[5]) || 0;
    //         setOpponentScore(prevScore => {
    //             const newScore = prevScore + points;
    //             localStorage.setItem('opponentScore', JSON.stringify(newScore));
    //             return newScore;
    //         });
    //     }, 30000);

    //     return () => clearTimeout(timer);
    // }, [data, index]);

    async function logout() {
        await fetch('/api/auth/logout', {
            method: 'DELETE',
        });
        navigate('/');
    }

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
            <input type="button" id="button" value="Ready for Next Round" onClick={() => navigate('/waiting')} />    <input type="button" id="button" value="Logout" onClick={logout} />
        </main>
    );
}