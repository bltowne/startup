import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Game() {
  const navigate = useNavigate();
  const [time, setTimer] = React.useState(30);
  const [remainingTime, setRemainingTime] = React.useState(30);
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
          if (data.length > 0) {
            const index = Math.floor(Math.random() * data.length);
            fetch('/api/index', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify({ index: index }),
            });
          }
        }
      });
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

  async function checkAnswer() {
    for (let i = 0; i < data[index].answers.length; i++) {
      if (text.toLowerCase() === data[index].answers[i].toLowerCase()) {
        setAnswer(data[index].answers[i]);
        await fetch('/api/answer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ answer: data[index].answers[i] }),
        });
        navigate('/scoreboard');
        return;
      }
    }
    alert("Try again");
    return;
  }

  function getQuestion() {
    if (data.length === 0) {
      navigate('/home')
      alert("No questions available. Please submit questions to the Question Submissions page before playing.");
      return;
    }
    return data[index].question;
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
            <h3>{getQuestion()}</h3>
            <br />
              <input type="text" placeholder="Enter answer" onChange={textChange}/>
              <br />
              <input type="submit" value="Submit" onClick={checkAnswer}/>
        </div>
    </main>
  );
}