const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authCookieName = 'token';

let users = [];
let currentUser = '';
let codes = [];
let data = [];
let score = 0;
let answer = '';
let index = 0;

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));
app.use(express.json());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);


// CreateAuth
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);
    currentUser = user;
    res.send({ username: user.username });
  }
});

// GetAuth
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      currentUser = user;
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser
apiRouter.get('/user', async (req, res) => {
  res.send(currentUser);
});

// CreateCode
apiRouter.post('/code', async (req, res) => {
    const user = req.body.username;
    const newCode = Math.floor(100000 + Math.random() * 900000);
    codes.push({ code: newCode, players: [user] });
    res.send({ code: newCode.code });
});

// JoinCode
apiRouter.post('/code/join', async (req, res) => {
    const { user, code } = req.body;
    const game = codes.find((c) => c.code === Number(code));
    if (game && !game.players.includes(user)) {
        game.players.push(user);
        res.send({ msg: 'Joined game' });
    } else {
        res.status(404).send({ msg: 'Game not found' });
    }
});

// GetData
apiRouter.get('/data', async (req, res) => {
    res.send(data);
});

// SubmitData
apiRouter.post('/data', async (req, res) => {
    data = updateData(req.body);
    res.send(data);
});

// CreateIndex
apiRouter.post('/index', async (req, res) => {
    index = req.body;
    res.send(index);
});

// GetIndex
apiRouter.get('/index', async (req, res) => {
    res.send(index);
});

// GetAnswer
apiRouter.get('/answer', async (req, res) => {
    res.send(answer);
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// SubmitAnswer
apiRouter.post('/answer', verifyAuth, async (req, res) => {
    answer = updateAnswer(req.body);
    res.send(answer);
});

// GetScore
apiRouter.get('/score', async (req, res) => {
    res.send(score);
});

// AddToScore
apiRouter.post('/score', async (req, res) => {
    score = updateScore(req.body);
    res.send(score);
});

function updateData(newData) {
    data.push(newData);
    return data;
}

function updateAnswer(newAnswer) {
    answer = newAnswer;
    return answer;
}

function updateScore(newScore) {
    score += newScore;
    return score;
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;
    return users.find((user) => user[field] === value);
}

function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});