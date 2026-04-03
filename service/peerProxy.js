const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer, services) {
  const socketServer = new WebSocketServer({ server: httpServer });
  const { getUserByToken, getCode } = services;

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
        const msg = JSON.parse(data);
        switch (msg.type) {
            case 'connectGame':
                await handleConnectGame(socket, msg.code);
                break;
            case 'answer':
                handleAnswer(socket, msg);
                break;
        }
    });

    async function handleConnectGame(socket, code) {
        const DBgame = await getCode(Number(code));
        if (!DBgame) {
            socket.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
            return;
        }
        if (!activeGames[code]) {
            activeGames[code] = {
                players: [],
                state: 'waiting',
                currentTurn: null,
                answers: [],
                timer: null,
            };
        }
        const game = activeGames[code];
        if (game.players.length >=2) {
            socket.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
            return;
        }

        socket.gameCode = code;
        game.players.push(socket);

        broadcast(code, {
            type: 'playerUpdate',
            players: game.players.map(p => p.username),
        });

        if (game.players.length === 2) {
            startGame(code);
        }
    }

    function broadcast(code, message) {
        const game = activeGames[code];
        if (!game) return;
        const msg = JSON.stringify(message);
        game.players.forEach(player => {
            if (player.readyState === WebSocket.OPEN) {
                player.send(msg);
            }
        });
    }

    function startGame(code) {
        const game = activeGames[code];
        game.state = 'playing';
        game.currentTurn = Math.floor(Math.random() * 2);
        broadcast(code, {
            type: 'gameStart',
            firstPlayer: game.players[game.currentTurn].username
        });
        startTurn(code);
    }

    function startTurn(code) {
        const game = activeGames[code];
        const current = game.players[game.currentTurn];
        const other = game.players[1 - game.currentTurn];
        current.send(JSON.stringify({ type: 'yourTurn', time: 30 }));
        other.send(JSON.stringify({ type: 'wait' }));
        game.timer = setTimeout(() => {
            endTurn(code);
        }, 30000);
    }

    function handleAnswer(socket, msg) {
        const code = socket.gameCode;
        const game = activeGames[code];
        if (!game) return;
        game.answers.push({
            player: socket.username,
            answer: msg.answer
        });
        clearTimeout(game.timer);
        const isFirst = game.players[game.currentTurn] === socket;
        if (isFirst) {
            const second = game.players[1 - game.currentTurn];
            second.send(JSON.stringify({
                type: 'retry',
                time: 35
            }));
            game.timer = setTimeout(() => {
                endTurn(code);
            }, 35000);
        } else {
            endTurn(code);
        }
    }

    function endTurn(code) {
        const game = activeGames[code];
        if (!game) return;
        broadcast(code, {
            type: 'roundEnd',
            answers:game.answers
        });
        game.answers = []
        game.currentTurn = 1 - game.currentTurn;
        setTimeout(() => {
            startTurn(code);
        }, 30000);
    }

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
    })

    socket.on('pong', () => {
        socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();

        client.isAlive = false;
        client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };