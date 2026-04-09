const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer, services) {
    const socketServer = new WebSocketServer({ server: httpServer });
    const { getUserByToken, getData } = services;

    const activeGames = {};

    socketServer.on('connection', async (socket, request) => {
        socket.isAlive = true;

        const cookies = request.headers.cookie;
        let token = null;
        if (cookies) {
            cookies.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name === 'token') {
                    token = value;
                }
            });
        }

        const user = await getUserByToken(token);
        if (!user) {
            socket.close();
            return;
        }
        socket.username = user.username;
        socket.gameCode = null;

        socket.on('message', async (data) => {
            const msg = JSON.parse(data.toString());
            console.log("Received: ", msg, " from ", socket.username);
            switch (msg.type) {
                case 'createGame':
                    console.log("Creating game");
                    handleCreateGame(socket);
                    break;
                case 'joinGame':
                    console.log("Joining game: ", msg.code);
                    handleJoinGame(socket, msg.code);
                    break;
                case 'answer':
                    console.log("Answer received: ", msg.answer);
                    handleAnswer(socket, msg);
                    break;
            }
        });

        socket.on('close', () => {
            const code = socket.gameCode;
            if (!code || !activeGames[code]) return;
            const game = activeGames[code];
            game.players = game.players.filter(p => p !== socket);
            if (game.players.length === 0) {
                delete activeGames[code];
            } else {
                broadcast(code, {
                    type: 'playerLeft',
                });
            }
        });

        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    function generateCode() {
        let code;
        do {
            code = Math.floor(100000 + Math.random() * 900000).toString();
        } while (activeGames[code]);
        return code;
    }

    function handleCreateGame(socket) {
        const code = generateCode();
        activeGames[code] = {
            players: [{ socket, username: socket.username, role: 'waiting', score: 0 }],
            state: 'waiting',
            currentTurn: null,
            answers: [],
            timer: null,
            turnIndex: 0,
            turnToken: 0,
        };
        socket.gameCode = code;
        socket.send(JSON.stringify({ type: 'gameCreated', code }));
    }

    function handleJoinGame(socket, code) {
        const game = activeGames[code];
        if (!game) {
            socket.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
            return;
        }
        if (game.players.length >= 2) {
            socket.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
            return;
        }
        // if (game.players.find(p => p === socket)) {
        //     return;
        // }
        socket.gameCode = code;
        const player = { socket, username: socket.username, role: 'waiting', score: 0 };
        game.players.push(player);
        socket.send(JSON.stringify({ type: 'gameJoined', code }));
        broadcast(code, {
            type: 'playerUpdate',
            players: game.players.map(p => p.username),
        });
        if (game.players.length === 2) {
            console.log("Two players connected: ", game.players.map(p => ({
                user: p.username,
                readyState: p.socket.readyState
            })));
            const firstIndex = Math.floor(Math.random() * 2);
            game.players[firstIndex].role = 'active';
            game.players[1 - firstIndex].role = 'waiting';
            console.log("Sending yourTurn to: ", game.players[firstIndex].username);
            setTimeout(() => startTurn(code), 1000);
            // game.players[firstIndex].socket.send(JSON.stringify({ type: 'yourTurn', code, }));
            // game.players[1 - firstIndex].socket.send(JSON.stringify({ type: 'wait', code, waitingFor: game.players[firstIndex].username }));
            // broadcast(code, {
            //     type: 'gameStart',
            //     code,
            //     firstPlayer: game.players[firstIndex].username,
            //     waitingPlayer: game.players[1 - firstIndex].username,
            // });
        }
    }

    function broadcast(code, message) {
        const game = activeGames[code];
        if (!game) return;
        console.log("Broadcasting to game ", code, ": ", message);
        const msg = JSON.stringify(message);
        game.players.forEach(player => {
            if (player.socket.readyState === WebSocket.OPEN) {
                player.socket.send(msg);
            }
        });
    }

    // function startGame(code) {
    //     console.log("Starting game: ", code);
    //     const game = activeGames[code];
    //     if (!game || game.players.length < 2) return;
    //     const firstIndex = Math.floor(Math.random() * 2);
    //     const firstPlayer = game.players[firstIndex];
    //     const secondPlayer = game.players[1 - firstIndex];
    //     console.log("First player: ", firstPlayer.username, "Second player: ", secondPlayer.username);
    //     firstPlayer.role = 'active';
    //     secondPlayer.role = 'waiting';
    //     firstPlayer.socket.send(JSON.stringify({ type: 'gameStart', code, firstPlayer: firstPlayer.username }));
    //     secondPlayer.socket.send(JSON.stringify({ type: 'wait', code, waitingFor: firstPlayer.username }));
        // startTurn(code);
        // game.state = 'playing';
        // game.currentTurn = Math.floor(Math.random() * 2);
        // broadcast(code, {
        //     type: 'gameStart',
        //     code,
        //     firstPlayer: game.players[game.currentTurn].username
        // });
        // startTurn(code);
    // }

    function startTurn(code) {
        const game = activeGames[code];
        if (!game) return;
        clearActiveTimer(game);
        console.log("Starting first player turn");
        const current = game.players.find(p => p.role === 'active');
        if (!current) return;
        const other = game.players.find(p => p.role === 'waiting');
        getData().then(data => {
            if (!data || data.length === 0) {
                console.log("No questions available");
                return;
            }
            game.turnToken++;
            const token = game.turnToken;
            const randomIndex = Math.floor(Math.random() * data.length);
            const currentData = data[randomIndex];
            game.answers = [];
            game.turnIndex = 0;
            game.currentTurn = {
                current,
                other,
                currentData,
                timer: setTimeout(() => {
                    if (game.turnToken !== token) return;
                    advanceTurn(code);
                }, 30000)
            };
            current.socket.send(JSON.stringify({ type: 'yourTurn', time: 30, data: currentData }));
            other.socket.send(JSON.stringify({ type: 'wait', data: currentData }));
        });
        // game.currentTurn = {
        //     current,
        //     other,
        //     timer: setTimeout(() => {
        //         startSecondPlayerTurn(code);
        // }, 30000)};
    }

    function startSecondPlayerTurn(code) {
        const game = activeGames[code];
        if (!game || !game.currentTurn) return;
        console.log("Starting second player turn");
        game.turnToken++;
        const token = game.turnToken;
        clearActiveTimer(game);
        const previous = game.currentTurn.current;
        const second = game.currentTurn.other;
        previous.role = 'waiting';
        second.role = 'active';
        game.turnIndex = 1;
        game.currentTurn = {
            current: second,
            other: previous,
            currentData: game.currentTurn.currentData,
            timer: setTimeout(() => {
                if (game.turnToken !== token) return;
                advanceTurn(code);
            }, 35000)
        };
        second.socket.send(JSON.stringify({ type: 'yourTurn', time: 35, data: game.currentTurn.currentData }));
        // game.currentTurn.timer = setTimeout(() => {
        //     endTurn(code);
        // }, 35000);
    }

    function handleAnswer(socket, msg) {
        console.log("Handling answer");
        const code = socket.gameCode;
        const game = activeGames[code];
        if (!game || !game.currentTurn) return;
        const player = game.players.find(p => p.socket === socket);
        if (!player || player.role !== 'active') {
            socket.send(JSON.stringify({ type: 'error', message: 'Not your turn' }));
            return;
        }
        if (game.turnIndex >= 2) return;
        game.turnToken++;
        clearActiveTimer(game);
        const submitted = msg.answer.trim().toLowerCase();
        const alreadyUsed = game.answers.some(a => a.answer.trim().toLowerCase() === submitted);
        if (alreadyUsed) {
            socket.send(JSON.stringify({ type: 'duplicateAnswer', answer: msg.answer }));
            return;
        }
        game.answers.push({
            player: socket.username,
            answer: msg.answer
        });
        clearActiveTimer(game);
        console.log("Answer handled");
        if (game.turnIndex === 0) {
            startSecondPlayerTurn(code);
        } else if (game.turnIndex === 1) {
            endTurn(code);
        }
    }

    function advanceTurn(code) {
        const game = activeGames[code];
        if (!game || !game.currentTurn) return;
        if (game.turnIndex === 0) {
            startSecondPlayerTurn(code);
        } else if (game.turnIndex === 1) {
            endTurn(code);
        }
    }

    function clearActiveTimer(game) {
        if (game.currentTurn?.timer) {
            clearTimeout(game.currentTurn.timer);
            game.currentTurn.timer = null;
        }
    }

    function endTurn(code) {
        const game = activeGames[code];
        if (!game) return;
        game.turnToken++;
        clearActiveTimer(game);
        game.turnIndex = 2;
        console.log("Ending turn", {code});
        const roundScores = calculateRoundScores(game.currentTurn.currentData, game.answers);
        for (const player of game.players) {
            const earned = roundScores[player.username] || 0;
            player.score += earned;
        }
        const cumulativeScores = {};
        game.players.forEach(p => {
            cumulativeScores[p.username] = p.score;
        });
        broadcast(code, {
            type: 'roundEnd',
            answers: game.answers,
            scores: cumulativeScores,
        });
        game.answers = []
        game.players.forEach(p => {
            p.role = p.role === 'active' ? 'waiting' : 'active';
        });
        // setTimeout(() => {
        //     startTurn(code);
        // }, 3000);
    }

    function calculateRoundScores(questionData, answers) {
        const scores = {};
        answers.forEach(({ player, answer }) => {
            const index = questionData.answers.findIndex(
                a => a.trim().toLowerCase() === answer.trim().toLowerCase()
            );
            scores[player] = index !== -1
                ? parseInt(questionData.points[index])
                : 0;
        });
        return scores;
    }

    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);

}

module.exports = { peerProxy };