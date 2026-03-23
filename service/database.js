const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const codeCollection = db.collection('code');
const dataCollection = db.collection('data');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {}

function getUserByToken(token) {}

async function addUser(user) {}

async function updateUser(user) {}

async function updateUserRemoveAuth(user) {}

async function addCode() {}

function getCode() {}

async function addData() {}

function getData() {}