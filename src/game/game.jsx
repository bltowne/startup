import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Game() {
  const navigate = useNavigate();
  const [time, setTimer] = React.useState(30);
  const [remainingTime, setRemainingTime] = React.useState(30);

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
    // placeholder function
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
            <form>
                <input type="text" placeholder="Enter answer"/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </main>
  );
}