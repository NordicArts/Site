'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserLevelSchema = new Schema({
  level: {
    type: String,
    index: true,
    unique: true
  }
});
UserLevelSchema.statics.findByLevel = function(level, callback) {
  return this.findOne({
    level: level
  }, callback);
};

mongoose.model('UserLevel', UserLevelSchema);