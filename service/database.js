const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db;
let userCollection;
let codeCollection;
let dataCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('startup');
    userCollection = db.collection('user');
    codeCollection = db.collection('code');
    dataCollection = db.collection('data');
    console.log('MongoDB connection successful');
  } catch (e) {
    console.error('MongoDB connection failed:', e.message);
    process.exit(1);
  }
}

connectDB();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token});
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ username: user.username }, { $unset: { token: 1} });
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
  addData,
  getData,
};
