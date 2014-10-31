'use strict';

var path = require('path');
var auth = require('./auth');
var pass = require('./pass'); // Passport

module.exports = function(app) {
  // Users
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userid', users.show);
  app.get('/auth/check_username/:username', users.exists); // Check
  
  // Passport
  var passport = require('passport');
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });
  
  // Session
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.delete('/auth/session', session.logout);
  
  // Blog
  var blogs = require('../controllers/blog');
  app.param('blogId', blogs.blog);
  app.get('/api/blogs', blogs.all);
  app.get('/api/blogs/:blogId', blogs.show);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);  
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.delete('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);
  
  // Games
  var games = require('../controllers/game');
  app.param('gameId', games.game);
  app.get('/api/games', games.all);
  app.get('/api/games/:gameId', games.show);
  app.post('/api/games', auth.ensureAuthenticated, games.create);
  app.put('/api/games/:gameId', auth.ensureAuthenticated, auth.game.hasAuthorization, games.update);
  app.delete('/api/games/:gameId', auth.ensureAuthenticated, auth.game.hasAuthorization, games.destroy);
  
  // Levels
  var levels = require('../controllers/levels');
  app.post('/api/levels', levels.create);
  app.post('/api/check', levels.check);  
  
  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });
  app.get('/*', function(req, res) {
    if (req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }
    res.render('index.html');
  });
};