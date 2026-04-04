var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { authRouter, usersRouter, leaderboardRouter, reportRouter, scoreRouter } = require('./src/routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/report', reportRouter);
app.use('/score', scoreRouter);

module.exports = app;
