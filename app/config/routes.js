'use strict';

var path = require('path');
var auth = require('./auth');

module.exports = function(app) {
  // Users
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userid', users.show);
  app.get('/auth/check_username/:username', users.exist); // Check
  
  // Session
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);
  
  // Blog
  var blogs = require('../controllers/blogs');
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.del('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);
  
  // BlogId
  app.param('blogId', blogs.blog);
  
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