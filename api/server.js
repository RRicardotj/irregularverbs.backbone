require('dotenv').config();
require('./config');
const bodyParser = require('body-parser');
const express = require('express');
// const jwtAuth = require('./middlewares/jwtAuth');

const app = express();
const server = require('http').Server(app);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// app.use(jwtAuth);

app.use(require('./src/routes'));
app.use('/test', require('./src/routesTests'));
// app.use(require('./middlewares/logger'));

const port = process.env.SERVER_PORT || 8080
server.listen(port);
console.log(`Listening on port ${port}`); // eslint-disable-line
