import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Waiting({ user }) {
  const [trivia, setTrivia] = React.useState("Loading...");
  const [time, setTimer] = React.useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const socket = location.state.socket;

  React.useEffect(() => {
    if (!socket) return;
    const handleMessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case 'gameStart':
          if (user === msg.firstPlayer) {
            navigate('/game', { state: { socket } });
          }
          break;
        case 'yourTurn':
          navigate('/game', { state: { socket } });
          break;
      }
    };
    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, navigate]);

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=20&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const question = data.results[randomIndex];
        setTrivia(question.question + " " + question.correct_answer);
      })
      .catch((err) =>
        setTrivia("Error loading questions"));
  }, []);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/game');
  //   }, time * 1000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <main>
        <h1>WAITING FOR OTHER PLAYERS</h1>
        <h4><i>If you haven't already, share the Family Game Code with someone else so they can join your game!</i></h4>
        <br />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNjoC9122qU7rOuPhqvmegbqfTOMQ6H4sKw&s" alt="Tick Tock" />
        <br />
        <h2>Warm up your brain while you wait</h2>
        <p className="answer-container">{trivia}</p>
    </main>
  );
}