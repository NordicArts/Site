'use strict';

angular.module('NordicArtsApp').controller('BlogCtrl', ['$scope', 'Blog', '$location', '$routeParams', '$rootScope', 'Auth', function ($scope, Blogs, $location, $routeParams, $rootScope, Auth) {  
  $scope.create = function() {    
    Auth.checkLevel(
      ['Admin', 'SuperAdmin'], function(error, isAllowed) {            
        if (error) {
          $location.path("/").end();
        }
        
        if (isAllowed.allowed) {
          var blog = new Blogs({
            title: this.title,
            content: this.content
          });
          blog.$save(function(response) {
            $location.path('blog/' + response._id);
          });
        }
      }
    );

    this.title = '';
    this.content = '';
  };

  $scope.remove = function(blog) {
    blog.$remove();

    for (var i in $scope.blogs) {
      if ($scope.blogs[i] === blog) {
        $scope.blogs.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var blog = $scope.blog;
    blog.$update(function() {
      $location.path('blog/' + blog._id);
    });
  };

  $scope.find = function() {
    Blogs.query(function(blogs) {
      $scope.blogs = blogs;
    });
  };

  $scope.findOne = function() {
    Blogs.get({
      blogId: $routeParams.blogId
    }, function(blog) {
      $scope.blog = blog;
    });
  };
}]);
