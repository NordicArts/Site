'use strict';

var mongoose  = require('mongoose');
var User      = mongoose.model('User');
var passport  = require('passport');
var ObjectId  = mongoose.Types.ObjectId;
var UserLevel = mongoose.model('UserLevel');

exports.create = function(req, res, next) {
  var levelId;
  
  UserLevel.findByLevel('Registered', function(error, level) {
    if (error) {
      return res.status(400).json(error);
    }
    
    var newUser       = new User(req.body);
    newUser.provider  = 'local';
    newUser.level     = ObjectId(level._id);
    newUser.save(function(error) {
      if (error) {
        return res.status(400).json(error);
      }
      req.logIn(newUser, function(error) {
        if (error) {
          return next(error);
        }
        return res.json(newUser.user_info);
      });
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
      res.status(404, 'USER_NOT_FOUND');
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
      res.json({
        exists: true
      });
    } else {
      res.json({
        exists: false
      });
    }
  });
};

exports.checkLevel = function(req, res, next) {
  var userId = req.params.userid;
  var level  = req.params.level;
  
  User.findById(Object(userId), function(error, user) {
    if (error) {
      return next(new Error('Failed to load user'));
    }
  });
};

exports.updateLevel = function(req, res, next) {
  var userId       = req.params.userid;
  var userLevel    = req.params.level;
  var targetId     = req.params.targetid;
  var targetLevel  = req.params.targetlevel;
  
    
};