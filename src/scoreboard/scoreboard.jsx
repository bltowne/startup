import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Scoreboard( { user, index, answer } ) {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('data'));
    const [currentScore, setCurrentScore] = React.useState(() => {
        const score = JSON.parse(localStorage.getItem('score'));
        return score || 0;
    });

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

    function getQuestion() {
        return data[index].question;
    }

    function getAnswer(i) {
        return data[index].answers[i];
    }

    function getPoints(i) {
        return data[index].points[i];
    }

    return (
        <main>
            <h1>SCOREBOARD</h1>
            <div className="score-container">
                <div className="gray-scoreboard">
                    <h2>{user}</h2><h4>{currentScore}</h4>
                </div>
                <div className="gray-scoreboard">
                    <h2>Team B</h2><h4>120</h4>
                </div>
            </div>
            <br />
            <h3>Question: {getQuestion()}</h3>
            <table>
                <tbody>
                    <tr>
                        <td className="answer">{getAnswer(0)}</td>
                        <td className="points">{getPoints(0)}</td>
                        <td className="answer">{getAnswer(4)}</td>
                        <td className="points">{getPoints(4)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer">{getAnswer(1)}</td>
                        <td className="points">{getPoints(1)}</td>
                        <td className="answer">{getAnswer(5)}</td>
                        <td className="points">{getPoints(5)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer">{getAnswer(2)}</td>
                        <td className="points">{getPoints(2)}</td>
                        <td className="answer">{getAnswer(6)}</td>
                        <td className="points">{getPoints(6)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="answer">{getAnswer(3)}</td>
                        <td className="points">{getPoints(3)}</td>
                        <td className="answer">{getAnswer(7)}</td>
                        <td className="points">{getPoints(7)}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <input type="button" id="button" value="Ready for Next Round" onClick={() => navigate('/waiting')} />
        </main>
    );
}