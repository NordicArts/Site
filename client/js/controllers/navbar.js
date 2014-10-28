'use strict';

angular.module('NordicArtsApp').controller('NavbarCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
  $scope.menu = [{
    'title': 'Blogs',
    'link': 'blogs'
  }];
  
  Auth.checkLevel(['Admin', 'SuperAdmin'] , function(error, isAllowed) {
    if (error) { return; }
    
    if (isAllowed.allowed) {
      $scope.authMenu = [{
      'title': 'Create New Blog',
      'link': 'blogs/create'
    }];
    }
  });

  $scope.logout = function() {
    Auth.logout(function(err) {
      if(!err) {
        $location.path('/login');
      }
    });
  };
}]);