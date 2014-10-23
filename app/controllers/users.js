'use strict';

var mongoose  = require('mongoose');
var User      = mongoose.model('User');
var passport  = require('passport');
var ObjectId  = mongoose.Types.ObjectId;

exports.create = function(req, res, next) {
  var newUser       = new User(req.body);
  newUser.provider  = 'local';
  newUser.save(function(error) {
    if (error) {
      return res.json(400, error);
    }
    req.logIn(newUser, function(error) {
      if (error) {
        return next(error);
      }
      return res.json(newUser.user_info);
    });
  });
};

exports.show = function(req, res, next) {
  var userId = req.params.userId;
  
  User.findById(ObjectId(userId), function(error, user) {
    if (error) {
      return next(new Error('Failed to load user'));
    }
    if (user) {
      res.send({
        username: user.name, 
        profile: user.profile
      });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  })
};

exports.exists = function(req, res, next) {  
  var username = req.params.username;
  User.findOne({
    username: username
  }, function(error, user) {
    if (error) {
      return next(new Error('Failed to load user: ' + username));
    }
    if (user) {
      req.json({
        exists: true
      });
    } else {
      req.json({
        exists: false
      });
    }
  });
};