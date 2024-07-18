const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(routes);

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(statusCode, err);
  res.status(statusCode).json('message', err.message);
  return;
});

module.exports  = app;
