'use strict';

var mongoose  = require('mongoose');
var passport  = require('passport');

// Strategys
var LocalStrategy    = require('passport-local').Strategy;
var GitHubStrategy   = require('passport-github').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// DB Models
var User       = mongoose.model('User');
var UserLevel  = mongoose.model('UserLevel');

// Keys
var config  = require('./config');

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

// GitHub Strategy
passport.use(new GitHubStrategy(config.github, function(accessToken, refreshToken, profile, done) {
  User.createByProvider(profile, function(providerErr, providerUser) {
    return done(providerErr, providerUser);
  });
}));

// Twitter Stategy
passport.use(new TwitterStrategy(config.twitter, function(accessToken, refreshToken, profile, done) {  
  User.createByProvider(profile, function(providerErr, providerUser) {
    return done(providerErr, providerUser);
  });
}));

// Facebook Strategy
passport.use(new FacebookStrategy(config.facebook, function(accessToken, refreshToken, profile, done) {
  User.createByProvider(profile, function(providerErr, providerUser) {
    return done(providerErr, providerUser);
  });
}));