var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const DB = require('config/db')

var indexRouter = require('./app/routes/index');
var getDataByWebRouter = require('./app/routes/getDataByWeb');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//global._ = require('lodash');
//global.ObjectId = require('mongoose').Types.ObjectId;

let db = {};
app.use(async function(req, res, next){
  console.log('dadereaw')
  db = await DB.getDB();
  global.db = db;
  next();
})

app.use('/', indexRouter);
app.use('/getDataByWeb', getDataByWebRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
