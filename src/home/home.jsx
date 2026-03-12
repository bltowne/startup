import React from 'react';
import "../app.css";
import { useNavigate } from "react-router-dom";

export function Home({ setUser, setGameCode }) {

    const [user, setText] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState(0);
    const navigate = useNavigate();
    const gameCodes = JSON.parse(localStorage.getItem('gameCodes')) || [];

    function NewGame() {
        console.log('login' + user);
        localStorage.setItem('username', user);
        setText(user);
        const newCode = Math.floor(100000 + Math.random() * 900000);
        setGameCode(newCode);
        localStorage.setItem('gameCode', newCode);
        gameCodes.push(newCode);
        localStorage.setItem('gameCodes', JSON.stringify(gameCodes));
        navigate('/waiting');
    }

    function JoinGame() {
        console.log('login' + user);
        localStorage.setItem('username', user);
        setText(user);
        for (let i = 0; i < gameCodes.length; i++) {
            if (Number(code) === Number(gameCodes[i])) {
                setGameCode(code);
                localStorage.setItem('gameCode', code);
                navigate('/waiting');
                return;
            }
        }
        alert("Game code not found. Please check the code and try again.");
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
                <input type="submit" value="Log In" onClick={NewGame}/> <input type="submit" value="Register" onClick={NewGame}/>
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
                <input type="submit" value="Log In" onClick={JoinGame}/> <input type="submit" value="Register" onClick={JoinGame}/>
            </div>
        </main>
    );
}