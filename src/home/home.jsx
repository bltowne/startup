import React from 'react';
import "../app.css";

export function Home({ setUser, setGameCode }) {

    const [text, setText] = React.useState('');
    const [code, setCode] = React.useState(0);

    function NewGame() {
        console.log('login' + text);
        localStorage.setItem('username', text);
        setUser(text);
        const newCode = Math.floor(100000 + Math.random() * 900000);
        setGameCode(newCode);
        localStorage.setItem('gameCode', newCode);
    }

    function JoinGame() {
        console.log('login' + text);
        localStorage.setItem('username', text);

    }

    function textChange(e) {
        setText(e.target.value);
    }

    return (
        <main>
            <h2>Welcome to Family Game Night!</h2>
            <div className="gray-html">
                <h3>Start a New Game</h3>
                {/* <form method="get" action="waiting.html"> */}
                    <input type="text" id="username" name="username" onChange={textChange} placeholder="Enter your username" required />
                    <br />
                    <input type="submit" value="Submit" onClick={NewGame}/>
                {/* </form> */}
            </div>
            <br />
            <div className="gray-html">
                <h3>Join an Existing Game</h3>
                {/* <form method="get" action="waiting.html"> */}
                    <input type="text" id="username" name="username" onChange={textChange} placeholder="Enter your username" required />
                    <br />
                    <input type="text" id="gamecode" name="gamecode" placeholder="Enter Family Game Code" required />
                    <br />
                    <input type="submit" value="Submit" onClick={JoinGame}/>
                {/* </form> */}
            </div>
        </main>
    );
}