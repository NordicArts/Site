'use strict';

// Modules
var express     = require('express');
var session     = require('express-session');
var http        = require('http');
var passport    = require('passport');
var path        = require('path');
var fs          = require('fs');
var mongoStore  = require('connect-mongo')(session);

// Config
var config      = require('./app/config/config');

// Database
var db          = require('./app/config/database').db;

// App
var app         = express();

// Bootstrap
var modelsPath  = path.join(__dirname + '/app/models');
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file);
});

// Pass
var pass = require('./app/config/pass');

// App Config
app.configure('development', function() {
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + 'app/views');
});

// Templating
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));

// Cookie Parser
app.use(express.cookieParser());

// Body Parser
app.use(express.bodyParser());
app.use(express.methodOverride());

// Sessions
app.use(session({
  secret: 'secret for secret people',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(app.router);

// Routes
require('./app/config/routes')(app);

// Start Server
app.listen(config.port, function() {
  console.log('Server Started on port %d in %s mode', config.port, app.get('env'));
})