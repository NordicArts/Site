'use strict';

var mongoose = require('mongoose');
var UserLevel = mongoose.model('UserLevel');

exports.create = function(req, res, next) {
  var newLevel = new UserLevel(req.body);
  newLevel.save(function(error) {
    if (error) {
      return res.json(400, error);
    }
    return res.json(newLevel);
  });
}