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

function getUser(email) {
  return userCollection.findOne({ email: email});
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token});
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1} });
}

async function addCode(code) {
  await codeCollection.insertOne(code);
}

function getCode(code) {
  return codeCollection.findOne({ code: code});
}

async function addData(data) {
  await dataCollection.insertOne(data);
}

function getData() {
  return dataCollection.find({}).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addCode,
  getCode,
  addData,
  getData,
};
