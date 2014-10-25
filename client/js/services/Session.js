'use strict';

angular.module('NordicArtsApp').factory('Session', ['$resource', function ($resource) {
  return $resource('/auth/session/');
}]);
