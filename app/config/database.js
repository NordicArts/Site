'use strict';

var mongoose  = require('mongoose');
var config    = require('./config');

exports.mongoose = mongoose;

var mongoOptions = {
  db: {
    safe: true
  }
};

// Connect
exports.db = mongoose.connect(config.db, mongoOptions, function(error, res) {
  if (error) {
    console.log('Error connect to ' + config.db + '. ' + error);
  } else {
    console.log('Success connect to ' + config.db);
  }
});