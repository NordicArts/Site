'use strict';

var mongoose  = require('mongoose');
var Game      = mongoose.model('Game');

exports.game = function(req, res, next, id) {
  Game.load(id, function(error, game) {
    if (error) {
      return next(error);
    }
    if (!game) {
      return next(new Error('failed to load game ' + id));
    }
    req.game = game;
    next();
  });
};
exports.create = function(req, res) {
  var game      = new Game(req.body);
  game.creator  = req.user;

  game.save(function(error) {
    if (error) {
      res.json(500, error);
    } else {
      res.json(game);
    }
  });
};
exports.update = function(req, res) {
  var game      = req.game;
  game.title    = req.body.title;
  game.content  = req.body.content;
  
  game.save(function(error) {
    if (error) {
      res.json(500, error);
    } else {
      res.json(game);
    }
  });
};
exports.destroy = function(req, res) {
  var game = req.game;
  
  game.remove(function(error) {
    if (error) {
      res.json(500, error);
    } else {
      res.json(game);
    }
  });
};
exports.show = function(req, res) {
  res.json(req.game);
};
exports.all = function(req, res) {
  Game.find().sort('-created').populate('creator', 'username').exec(function(error, games) {
    if (error) {
      res.json(500, error);
    } else {
      res.json(games);
    }
  });
};