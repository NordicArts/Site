'use strict';

angular.module('NordicArtsApp').controller('NavbarCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
  $scope.menu = [
    {
      'title': 'Games',
      'link': 'games'
    },
    {
      'title': 'Blog',
      'link': 'blog'
    }
  ];
  
  Auth.checkLevel(['Admin', 'SuperAdmin'] , function(error, isAllowed) {
    if (error) { return; }
    
    if (isAllowed.allowed) {
      $scope.authMenu = [
        {
          'title': 'Add Game',
          'link': 'games/create',
          'icon': 'glyphicon-tower'
        },
        {
          'title': 'Add Blog Entry',
          'link': 'blog/create',
          'icon': 'glyphicon-book'
        },
        {
          'title': 'Admin',
          'link': 'admin',
          'icon': 'glyphicon-dashboard'
        }
      ];
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