'use strict';

var mongoose  = require('mongoose');
var Blog      = mongoose.model('BlogPost');

exports.blog = function(req, res, next, id) {
  Blog.load(id, function(error, blog) {
    if (error) {
      return next(error);
    }
    if (!blog) {
      return next(new Error('failed to load blog ' + id));
    }
    req.blog = blog;
    next();
  });
};
exports.create = function(req, res) {
  var blog      = new Blog(req.body);
  blog.creator  = req.user;

  blog.save(function(error) {
    if (error) {
      res.json(500, error);
    } else {
      res.json(blog);
    }
  });
};
exports.update = function(req, res) {
  var blog    = req.blog;
  blog.title  = 
}