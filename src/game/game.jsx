import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Game({ index, setIndex, answer, setAnswer, user, gameCode }) {
  const navigate = useNavigate();
  // const [time] = React.useState(30);
  const [remainingTime, setRemainingTime] = React.useState(0);
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [question, setQuestion] = React.useState("Loading question...");
  const [answers, setAnswers] = React.useState([]);
  const [myTurn, setMyTurn] = React.useState(false);
  const location = useLocation();
  const socket = location.state.socket;

  React.useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((fetchedData) => {
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          const randomIndex = Math.floor(Math.random() * fetchedData.length);
          setData(fetchedData);
          setIndex(randomIndex);
          setQuestion(fetchedData[randomIndex].question);
        } else {
          alert("No questions available. Please submit questions to the Question Submissions page before playing.");
          navigate('/');
        }
      });
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    const handleMessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("WS message: ", msg);
      switch (msg.type) {
        case 'yourTurn':
          setMyTurn(true);
          setRemainingTime(msg.time);
          break;
        case 'roundEnd':
          setAnswers(msg.answers);
          setMyTurn(false);
          navigate('/scoreboard', { state: {socket, answers: msg.answers} });
          break;
      }
    };
    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, navigate]);

  React.useEffect(() => {
    if (remainingTime === 0) {
      socket.send(JSON.stringify({ type: 'endTurn' }));
    }
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [remainingTime]);

  function checkAnswer() {
    if (!data[index]) return;
    for (let i = 0; i < data[index].answers.length; i++) {
      if (text.toLowerCase() === data[index].answers[i].toLowerCase()) {
        socket.send(JSON.stringify({ type: 'answer', answer: text }));
        // setAnswer(data[index].answers[i]);
        // navigate('/scoreboard');
        // return;
      }
    }
    alert("Try again");
    return;
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
              <input type="submit" value="Submit" onClick={checkAnswer}/>
        </div>
    </main>
  );
}