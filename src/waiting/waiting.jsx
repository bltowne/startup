import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useWS } from '../ws/WebSocketContext';

export function Waiting() {
  const [trivia, setTrivia] = React.useState("Loading...");
  // const [time, setTimer] = React.useState(5);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { lastMessage } = useWS();

  // React.useEffect(() => {
  //   if (!lastMessage) return;
  //   if (lastMessage.type === 'gameCreated' || lastMessage.type === 'gameJoined') {
  //     console.log('Home page navigating to waiting');
  //     navigate('/waiting');
  //   }
  //   if (lastMessage.type === 'yourTurn') {
  //     console.log('Waiting page navigating to game');
  //     navigate('/game');
  //   }
  // }, [lastMessage, navigate]);

  // React.useEffect(() => {
  //   if (!socket) return;
  //   console.log("Waiting page mounted. User: ", user, "Socket: ", socket);
  //   const handleMessage = (event) => {
  //     const msg = JSON.parse(event.data);
  //     console.log("WS message: ", msg);
  //     switch (msg.type) {
  //       // case 'gameStart':
  //         // if (user === msg.firstPlayer) {
  //         //   console.log("Navigating first player to game");
  //         //   navigate('/game', { state: { socket, user } });
  //         // } else {
  //         //   console.log("Waiting for first player to finish");
  //         // }
  //         // break;
  //       case 'yourTurn':
  //         console.log("Navigating player to game");
  //         navigate('/game', { state: { socket, user } });
  //         break;
  //     }
  //   };
  //   socket.addEventListener('message', handleMessage);
  //   return () => {
  //     socket.removeEventListener('message', handleMessage);
  //   };
  // }, [socket, navigate, user]);

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