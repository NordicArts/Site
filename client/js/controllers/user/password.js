'use strict';

angular.module('NordicArtsApp').controller('PasswordCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.error = {};
  $scope.user = {};
  
  $scope.password = function(form) {
    $scope.errors = {};
    
    if ($scope.user.newpassword !== $scope.user.confirmpassword) {
      $scope.error.other = "New passwords don't match";
    } else {
      Auth.changePassword($scope.user.oldpassword, $scope.user.newpassword, function(err) {
        if (err) {
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
          });
          $scope.error.other = err.message;
        } else {
          $location.path('/user');
        }
      });
    }
  };
}]);