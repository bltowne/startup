import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AltLayout } from './layouts/AltLayout';
import { Home } from './home/home';
import { Waiting } from './waiting/waiting';
import { Game } from './game/game';
import { Library } from './library/library';
import { Scoreboard } from './scoreboard/scoreboard';
import { useNavigate } from "react-router-dom";
import { useWS } from './ws/WebSocketContext';
import { WebSocketProvider } from './ws/WebSocketContext';

export default function App() {

    return (
        <WebSocketProvider>
            <BrowserRouter>
                {/* <div className="body">
                    <Routes>
                        <Route element={<MainLayout />} >
                            <Route path="/" element={<Home setUser={setUser} setGameCode={setGameCode} />} />
                            <Route path="/library" element={<Library />} />
                        </Route>
                        <Route element={<AltLayout user={user} gameCode={gameCode} />} >
                            <Route path="/waiting" element={<Waiting />} />
                            <Route path="/game" element={<Game index={index} setIndex={setIndex} answer={answer} setAnswer={setAnswer} user={user} gameCode={gameCode} />} />
                            <Route path="/scoreboard" element={<Scoreboard user={user} index={index} answer={answer} />} />
                        </Route>
                    </Routes>
                </div> */}
                <AppContent />
            </BrowserRouter>
        </WebSocketProvider>
    );
}

function AppContent() {
    const [user, setUser] = React.useState(localStorage.getItem('username') || null);
    const [gameCode, setGameCode] = React.useState(localStorage.getItem('gameCode') || null);
    const [index, setIndex] = React.useState(0);
    const [answer, setAnswer] = React.useState('');
    const { lastMessage } = useWS();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!lastMessage) return;
        switch (lastMessage.type) {
            case 'gameCreated':
            case 'gameJoined':
                setGameCode(lastMessage.code);
                console.log('App navigating to waiting');
                navigate('/waiting');
                break;
            case 'yourTurn':
                console.log('App navigating to game');
                navigate('/game');
                break;
        }
    }, [lastMessage, navigate]);

    return (
        <div className="body">
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home setUser={setUser} />} />
                    <Route path="/library" element={<Library />} />
                </Route>
                <Route element={<AltLayout user={user} gameCode={gameCode} />} >
                    <Route path="/waiting" element={<Waiting />} />
                    <Route path="/game" element={<Game index={index} setIndex={setIndex} answer={answer} setAnswer={setAnswer} user={user} gameCode={gameCode} />} />
                    <Route path="/scoreboard" element={<Scoreboard user={user} index={index} />} />
                </Route>
            </Routes>
        </div>
    );
}