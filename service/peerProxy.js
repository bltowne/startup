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

    socket.on('message', function message(data) {
        socketServer.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

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