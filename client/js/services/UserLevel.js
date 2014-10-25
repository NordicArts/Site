'use strict';

angular.module('NordicArtsApp').factory('UserLevel', ['$resource', function($resource) {
  return $resource('/auth/check_level/');
}]);