import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Scoreboard() {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [index, setIndex] = React.useState(0);

    const [currentScore, setCurrentScore] = React.useState(0);

    const [opponentScore, setOpponentScore] = React.useState(() => {
        const score = JSON.parse(localStorage.getItem('opponentScore'));
        return score || 0;
    });

    const highlight = {
        backgroundColor: "lightgreen",
    };

    const opponentHighlight = {
        backgroundColor: "lightcoral"
    };

    const [opponentHighlightIndex, setOpponentHighlightIndex] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/user')
            .then((response) => response.json())
            .then((user) => {
                setUser(user);
            });
        fetch('/api/answer')
            .then((response) => response.json())
            .then((answer) => {
                setAnswer(answer);
            });
        fetch('/api/index')
            .then((response) => response.json())
            .then((index) => {
                setIndex(index);
            });
        fetch('/api/data')
            .then((response) => response.json())
            .then((data) => {
                localStorage.setData('data', JSON.stringify(data));
            });
        fetch('/api/score')
            .then((response) => response.json())
            .then((score) => {
                setCurrentScore(score);
            });
        fetch('/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ score: currentScore }),
        });
    }, []);


    React.useEffect(() => {
        for (let i = 0; i < data[index].answers.length; i++) {
            if (answer.toLowerCase() === data[index].answers[i].toLowerCase()) {
                const points = parseInt(data[index].points[i]);
                
                setCurrentScore(prevScore => {
                    const newScore = prevScore + points;
                    localStorage.setItem('score', JSON.stringify(newScore));
                    return newScore;
                });
                return;
            }
        }
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            let newIndex = 5;
            if (newIndex === index) {
                newIndex = (newIndex + 1);
            }
            console.log(newIndex);
            setOpponentHighlightIndex(newIndex);
            const points = parseInt(data[index].points[5]);
            setOpponentScore(prevScore => {
                const newScore = prevScore + points;
                localStorage.setItem('opponentScore', JSON.stringify(newScore));
                return newScore;
            });
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    async function logout() {
        await fetch('/api/auth/logout', {
            method: 'DELETE',
        });
        navigate('/');
    }

    function getQuestion() {
        return data[index].question;
    }

    function getAnswer(i) {
        return data[index].answers[i];
    }

    function getPoints(i) {
        return data[index].points[i];
    }

    function highlightAnswer(i) {
        if (answer === getAnswer(i)) {
            return highlight;
        }
        return {};
    }

    function highlightOpponentAnswer(i) {
        if (i === opponentHighlightIndex) {
            return opponentHighlight;
        }
        return {};
    }

    return (
        <main>
            <h1>SCOREBOARD</h1>
            <div className="score-container">
                <div className="gray-scoreboard" style={{ border: "4px solid green" }}>
                    <h2>{user}</h2><h4>{currentScore}</h4>
                </div>
                <div className="gray-scoreboard" style={{ border: "4px solid red" }}>
                    <h2>Team B</h2><h4>{opponentScore}</h4>
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