var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var { authRouter, usersRouter, leaderboardRouter, reportRouter, scoreRouter } = require('./src/routes');
const { specs, swaggerUi } = require('./config/swagger');
const authMiddleware = require('./src/middleware/auth.middleware');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use(authMiddleware)
app.use('/api/users', usersRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/report', reportRouter);
app.use('/api/score', scoreRouter);

module.exports = app;
