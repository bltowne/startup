import React from 'react';
import "../app.css";
// import { useNavigate } from "react-router-dom";
import { useWS } from '../ws/WebSocketContext';

export function Home() {

    const [user, setText] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState(0);
    // const navigate = useNavigate();
    const { send, connected } = useWS();

    async function loginOrCreate(endpoint, nextStep) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: user, password: password }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            console.log('login' + user);
            setText(user);
            localStorage.setItem('username', user);
            // let ws = socket;
            // if (!ws) {
            //     const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
            //     const wsUrl = window.location.origin.replace(/^http/, 'ws') + '/ws';
            //     console.log("WS URL: ", wsUrl);
            //     ws = new WebSocket(wsUrl);
            //     ws.addEventListener('open', () => {
            //         console.log('WebSocket connection established');
            //     });
            //     ws.addEventListener('message', (event) => {
            //         handleMessage(JSON.parse(event.data));
            //     });
            //     setSocket(ws);
            // }
            nextStep();
        } else {
            // const text = await response.text();
            // console.log("server response: " + text);
            alert('Error: Please try again');
        }
    }

    async function NewGame(ws) {
        // const response = await fetch('/api/code', {
        //     method: 'post',
        //     body: JSON.stringify({ username: user }),
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8',
        //     },
        // });
        // const { code } = await response.json();
        // setCode(code);
        // localStorage.setItem('gameCode', code);
        // navigate('/waiting');
        if (!connected) return;
        console.log("Creating game");
        // ws.send(JSON.stringify({ type: 'createGame' }));
        send({ type: 'createGame' });
    }

    async function JoinGame(ws) {
        // const response = await fetch('/api/code/join', {
        //     method: 'post',
        //     body: JSON.stringify({ username: user, code: code }),
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8',
        //     },
        // });
        // if (response.ok) {
        //     localStorage.setItem('gameCode', code);
        //     navigate('/waiting');
        // } else {
        //     alert("Error: Game does not exist.");
        // }
        if (!connected) return;
        console.log("Joining game: ", code);
        // ws.send(JSON.stringify({ type: 'joinGame', code: code }));
        send({ type: 'joinGame', code });
    }    

    // function handleMessage(msg) {
    //     console.log("WS message: ", msg);
    //     switch (msg.type) {
    //         case 'gameCreated':
    //             setCode(msg.code);
    //             localStorage.setItem('gameCode', msg.code);
    //             navigate('/waiting', { state: { socket, user } });
    //             break;
    //         case 'gameJoined':
    //             setCode(msg.code);
    //             localStorage.setItem('gameCode', msg.code);
    //             navigate('/waiting', { state: { socket, user } });
    //             break;
    //         case 'error':
    //             alert(msg.message);
    //             break;
    //     }
    // }

    function userChange(e) {
        setText(e.target.value);
    }

    function passwordChange(e) {    
        setPassword(e.target.value);
    }

    function codeChange(e) {
        setCode(Number(e.target.value));
    }

    return (
        <main>
            <h2>Welcome to Family Game Night!</h2>
            <div className="gray-html">
                <h3>Start a New Game</h3>
                <input type="text" id="username" name="username" onChange={userChange} placeholder="Enter your username" required />
                <br />
                <input type="password" id="password" name="password" onChange={passwordChange} placeholder="Enter your password" required />
                <br />
                <input type="submit" value="Log In" onClick={() => loginOrCreate('/api/auth/login', NewGame)}/> <input type="submit" value="Register" onClick={() => loginOrCreate('/api/auth/create', NewGame)}/>
            </div>
            <br />
            <div className="gray-html">
                <h3>Join an Existing Game</h3>
                <input type="text" id="username" name="username" onChange={userChange} placeholder="Enter your username" required />
                <br />
                <input type="password" id="password" name="password" onChange={passwordChange} placeholder="Enter your password" required />
                <br />
                <input type="text" id="gamecode" name="gamecode" onChange={codeChange} placeholder="Enter Family Game Code" required />
                <br />
                <input type="submit" value="Log In" onClick={() => loginOrCreate('/api/auth/login', JoinGame)}/> <input type="submit" value="Register" onClick={() => loginOrCreate('/api/auth/create', JoinGame)}/>
            </div>
        </main>
    );
}