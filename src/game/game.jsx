import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Game() {
  const navigate = useNavigate();
  const [time, setTimer] = React.useState(30);
  const [remainingTime, setRemainingTime] = React.useState(30);
  const [text, setText] = React.useState('');
  const data = JSON.parse(localStorage.getItem('data'));
  const [randomIndex, setRandomIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');

  React.useEffect(() => {
    if (data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      setRandomIndex(index);
    }
  }, []);

  React.useEffect(() => {
    if (remainingTime === 0) {
      navigate('/scoreboard');
    }
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [remainingTime, navigate]);

  function getQuestion() {
    if (!data) {
      return "There are no questions available. Please submit a question through the Question Submissions page.";
    }
    return data[randomIndex].question;
  }

  function textChange(e) {
    setText(e.target.value);
  }

  function checkAnswer() {
    for (let i = 0; i < data[randomIndex].answers.length; i++) {
      if (text.toLowerCase() === data[randomIndex].answers[i].toLowerCase()) {
        setAnswer(data[randomIndex].answers[i]);
        navigate('/scoreboard');
        return;
      }
    }
    alert("Try again");
    return;
  }

  return (
    <main>
        <h2>You have {time} seconds to answer!</h2>
        <br />
        <h1>{remainingTime}</h1>
        <br />
        <div className="answer-container">
            <h3>{getQuestion()}</h3>
            <br />
              <input type="text" placeholder="Enter answer" onChange={textChange}/>
              <br />
              <input type="submit" value="Submit" onClick={checkAnswer}/>
        </div>
    </main>
  );
}