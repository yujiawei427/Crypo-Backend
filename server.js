const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});

const routes = require('./routes/routes.js')(app, fs); 
//file system is injected to the route for later use, dependency injection.
const server = app.listen(process.env.Port, () => {
  console.log(`Server is running on ${process.env.Port}`);
});