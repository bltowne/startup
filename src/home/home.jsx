import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Home() {

    const [user, setText] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState(0);
    const navigate = useNavigate();

    async function loginOrCreate(endpoint, nextStep) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: user, password: password }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        console.log("status: " + response.status);

        if (response.ok) {
            console.log('login' + user);
            setText(user);
            localStorage.setItem('username', user);
            await nextStep();
        } else {
            const text = await response.text();
            console.log("server response: " + text);
            alert('Error: Please try again');
        }
    }

    async function NewGame() {
        const response = await fetch('/api/code', {
            method: 'post',
            body: JSON.stringify({ username: user }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        const { code } = await response.json();
        setGameCode(code);
        localStorage.setItem('gameCode', code);
        navigate('/waiting');
    }

    async function JoinGame() {
        const response = await fetch('/api/code/join', {
            method: 'post',
            body: JSON.stringify({ username: user, code: code }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            navigate('/waiting');
        } else {
            setDisplayError(`Error: Game does not exist.`);
        }
    }

    function userChange(e) {
        setText(e.target.value);
    }

    function passwordChange(e) {    
        setPassword(e.target.value);
    }

    function codeChange(e) {
        setCode(e.target.value);
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