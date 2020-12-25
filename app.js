var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var companyApply = require('./routes/companyApply');
var personalApply = require('./routes/personalApply.js');
var applyComplete = require('./routes/applyComplete');
var applyProgress = require('./routes/applyProgress');


var login = require('./routes/login');
var applyList = require('./routes/applyList');
var applyInfo = require('./routes/applyInfo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/apply/company', companyApply);
app.use('/apply/personal', personalApply);
app.use('/apply/complete', applyComplete);
app.use('/apply/progress', applyProgress);

app.use('/cms/login', login);
app.use('/cms/apply/list', applyList);
app.use('/cms/apply/info', applyInfo);

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
