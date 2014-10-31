'use strict';

// Modules
var express         = require('express');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var methodOverride  = require('method-override');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var errorHandler    = require('errorhandler');
var cookieParser    = require('cookie-parser');
var http            = require('http');
var passport        = require('passport');
var path            = require('path');
var fs              = require('fs');
var mongoStore      = require('connect-mongo')(session);
var config          = require('./app/config/config');

// App
var app = express();

// Database
var db = require('./app/config/database').db;

// Bootstrap
var modelsPath = path.join(__dirname, 'app/models');
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file);
});

// Passport
var pass = require('./app/config/pass');

// Config
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
if ('development' === app.get('env')) {
  app.set('views', __dirname + '/client/views');
} else if ('production' === app.get('env')) {
  app.set('views', __dirname + '/public/views');
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
}

// Logger
app.use(logger('dev'));

// Override
app.use(methodOverride());

// Cookie Parser
app.use(cookieParser());

// Mongo
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secrets for secret people',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
}));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Statics
if ('development' === app.get('env')) {
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'client'))); 
  app.use(errorHandler());
} else if ('production' === app.get('env')) {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Build DB
if ('development' === app.get('env')) {
  //require('./app/database/dev')(db);
} else if ('production' == app.get('env')) {
  require('./app/database/live')(db);
}

// Routes
require('./app/config/routes')(app);

// Start Server
app.listen(config.port, function() {
  console.log('Server started on port %d in %s enviroment', config.port, app.get('env'));
});