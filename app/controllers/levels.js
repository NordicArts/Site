'use strict';

var mongoose  = require('mongoose');
var UserLevel = mongoose.model('UserLevel');
var User      = mongoose.model('User');

exports.create = function(req, res, next) {
  var newLevel = new UserLevel(req.body);
  newLevel.save(function(error) {
    if (error) {
      return res.status(400).json(error);
    }
    return res.json(newLevel);
  });
};

exports.check = function(req, res, next) {  
  // Params
  var userid = req.body.userid;
  var levels = req.body.levels;
  
  //get the user info for this user
  User.findOne({
    _id: userid
  }, function(userError, userResult) {
    if (userError) {
      return res.status(400).json(userError);
    }
    
    //console.log("User Result", userResult);
    if (!userResult) {
      return res.status(400).json({
        allowed: false
      });
    }
    
    UserLevel.findOne({
      _id: userResult.level
    }, function(levelError, levelResult) {
      
      //console.log("Level Result", levelResult);
      if (levelError) {
        return res.status(400).json(levelError);
      }
      
      if (levelResult) {
        for (var i = 0; i < levels.length; i++) {        
          if (levels[i] === levelResult.level) {
            return res.json({
              allowed: true
            });
          }
        }
      }
      
      return res.json({
        allowed: false
      });
    });
  });
};