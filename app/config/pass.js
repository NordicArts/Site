'use strict';

var mongoose       = require('mongoose');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var User           = mongoose.model('User');

// Serialize Sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, function(error, user) {
    done(error, user);
  });
});

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({
    email: email
  }, function(error, user) {
    if (error) {
      return done(error);
    }
    if (!user) {
      return done(null, false, {
        'errors': {
          'email': {
            type: 'Email not registered'
          }
        }
      });
    }
    if (!user.authenticate(password)) {
      return done(null, false, {
        'errors': {
          'password': {
            type: 'Password is incorrect'
          }
        }
      });
    }
    return done(null, user);
  });
}));