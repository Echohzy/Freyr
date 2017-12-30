var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var page = require('./routes/page');



var account = require('./routes/account');
var movie = require('./routes/movie');
var movieReview = require('./routes/movie_review');
var notification = require('./routes/notification');
var book = require('./routes/book');


var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack/webpack.config");

var compiler = webpack(webpackConfig);

require("./config/app_init.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src')));
// app.use(webpackDevMiddleware(compiler,{
//    publicPath: webpackConfig.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler));
app.use("/api/accounts", account);
app.use("/api/movies", movie);
app.use("/api/movie_reviews", movieReview);
app.use("/api/notifications", notification);
app.use("/api/books", book);
app.use('/', page);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
