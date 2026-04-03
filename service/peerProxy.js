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
        const DBgame = await getCode(code);
        if (!DBgame) {
            socket.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
            return;
        }
        if (!activeGames[code]) {
            activeGames[code] = {
                players: [],
                state: 'waiting',
                currentTurn: null,
                answer: [],
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