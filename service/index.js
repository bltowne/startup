const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

let users = [];
let data = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));
app.use(express.json());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Add endpoints here - step 5 simon, step 6 main


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});