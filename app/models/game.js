'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var GameSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

GameSchema.pre('save', function(next, done) {
  if (this.isNew) {
    this.created = Date.now();
  }
  this.updated.push(Date.now());
  
  next();
});

GameSchema.statics = {
  load: function(id, callback) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(callback);
  },
  findByTitle: function(title, callback) {
    return this.find({
      title: title
    }, callback);
  }
};

GameSchema.methods.expressiveQuery = function(creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
};

function slugGenerator(options) {
  options = (options || {});
  var key = (options.key || 'title');
  
  return function slugGenerator(schema) {
    schema.path(key).set(function(v) {
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      
      return v;
    });
  };
};

GameSchema.plugin(slugGenerator());

mongoose.model('Game', GameSchema);