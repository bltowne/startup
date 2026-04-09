import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";
import { useWS } from '../ws/WebSocketContext';

export function Game({ index, setIndex, answer, setAnswer, user, gameCode }) {
  const navigate = useNavigate();
  const [time, setTime] = React.useState(30);
  const [remainingTime, setRemainingTime] = React.useState(0);
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState(null);
  const [question, setQuestion] = React.useState("Loading question...");
  const { lastMessage, send } = useWS();
  const canSubmit = Array.isArray(data?.answers) && remainingTime > 0;

  React.useEffect(() => {
    if (!lastMessage) return;
    switch(lastMessage.type) {
      case 'yourTurn':
        setRemainingTime(lastMessage.time);
        setTime(lastMessage.time);
        setData(lastMessage.data);
        localStorage.setItem('data', JSON.stringify(lastMessage.data));
        setQuestion(lastMessage.data.question);
        console.log('Everything set');
        break;
      case 'roundEnd':
        localStorage.setItem('lastRoundAnswers', JSON.stringify(lastMessage.answers));
        localStorage.setItem('totalScores', JSON.stringify(lastMessage.scores));
        console.log('App navigating to scoreboard');
        navigate('/scoreboard');
        break;
      case 'duplicateAnswer':
        alert("Try again");
        break;
    }
  }, [lastMessage, navigate]);

  React.useEffect(() => {
    if (remainingTime === 0) return;
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [remainingTime]);

  function checkAnswer() {
    if (!data || !Array.isArray(data.answers)) {
      console.warn("Answers not ready yet");
      return;
    }
    const isCorrect = data.answers.some(a => a.toLowerCase() === text.toLowerCase());
    if (isCorrect) {
      console.log("Answer submitted", text);
      send({ type: 'answer', answer: text });
      alert("Submitted! Wait for other player to submit to see score.");
    } else {
      alert("Try again");
      return;
    }
  }

  function textChange(e) {
    setText(e.target.value);
  }

  return (
    <main>
        <h2>You have {time} seconds to answer!</h2>
        <br />
        <h1>{remainingTime}</h1>
        <br />
        <div className="answer-container">
            <h3>{question}</h3>
            <br />
              <input type="text" placeholder="Enter answer" onChange={textChange}/>
              <br />
              <input type="submit" value="Submit" onClick={checkAnswer} disabled={!canSubmit}/>
              {/* <button onClick={checkAnswer} disabled={!canSubmit}>Submit</button> */}
        </div>
    </main>
  );
}