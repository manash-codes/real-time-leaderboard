var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var leaderboardRouter = require('./routes/leaderboard');
var reportRouter = require('./routes/report');
var scoreRouter = require('./routes/score');
var usersRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/report', reportRouter);
app.use('/score', scoreRouter);

module.exports = app;
