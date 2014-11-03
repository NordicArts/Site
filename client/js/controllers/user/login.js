'use strict';

angular.module('NordicArtsApp').controller('LoginCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
  $scope.error = {};
  $scope.user = {};

  $scope.login = function(form) {    
    Auth.login('password', {
      'email': $scope.user.email,
      'password': $scope.user.password
    }, function(err) {
      $scope.errors = {};

      if (!err) {        
        Auth.checkPasswordStatus(function(forceReset) {
          if (forceReset) {
            $location.path('/account/password');
          } else {
            $location.path('/');
          }
        });
      } else {
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.type;
        });
        $scope.error.other = err.message;
      }
    });
  };
}]);