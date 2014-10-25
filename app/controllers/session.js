'use strict';

var mongoose = require('mongoose');
var passport = require('passport');

exports.session = function(req, res) {
  res.json(req.user.user_info);
};

exports.logout = function(req, res) {
  if (req.user) {
    req.logout();
    res.sendStatus(200);
  } else {
    res.status(400).send('Not Logged In');
  }
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = (err || info);
    if (error) {
      return res.status(400).json(error);
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(400).send(err);
      }
      res.json(req.user.user_info);
    });
  })(req, res, next);
};