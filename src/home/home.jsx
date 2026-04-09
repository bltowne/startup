import React from 'react';
import "../app.css";
import { useWS } from '../ws/WebSocketContext';

export function Home() {

    const [user, setText] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState(0);
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
            nextStep();
        } else {
            alert('Error: Please try again');
        }
    }

    async function NewGame(ws) {
        if (!connected) return;
        console.log("Creating game");
        send({ type: 'createGame' });
    }

    async function JoinGame(ws) {
        if (!connected) return;
        console.log("Joining game: ", code);
        send({ type: 'joinGame', code });
    }    

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