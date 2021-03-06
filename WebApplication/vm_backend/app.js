var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




// Require Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var EmployeeRouter = require('./routes/EmployeeRouter');
var ProductRouter = require('./routes/ProductRouter');
var PurchaseRouter = require('./routes/PurchaseRouter');
// Intance Express application
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees',EmployeeRouter);
app.use('/products',ProductRouter);
app.use('/purchases',PurchaseRouter);











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
