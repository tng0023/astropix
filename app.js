var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var index = require('./routes/index');
var favorites = require('./routes/favorites');

var app = express();

app.engine('.hbs', hbs({
  extname:'.hbs',
  defaultLayout: 'layout',
  partialsDor: path.join(__dirname, 'views/partials')
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongo_pw = process.env.MONGO_PW;
var url = process.env.MONGO_URL;
var url = 'mongodb://tng0023:Tng621180!@ds123371.mlab.com:23371/astropix';

var store = new MongoDBStore({
  uri : url,
  collection : 'sessions'
}, function(error){
  if(error) console.log(error)
});

app.use(session({
  secret: "put a random string here",
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use('/', index);
app.use('/favorites', favorites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
