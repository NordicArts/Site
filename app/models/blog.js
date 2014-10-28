'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BlogSchema = new Schema({
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

BlogSchema.pre('save', function(next, done) {
  if (this.isNew) {
    this.created = Date.now();
  }
  this.updated.push(Date.now());
  
  next();
});

BlogSchema.statics = {
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

BlogSchema.methods.expressiveQuery = function(creator, date, callback) {
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

BlogSchema.plugin(slugGenerator());

mongoose.model('BlogPost', BlogSchema);