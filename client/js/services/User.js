'use strict';

angular.module('NordicArtsApp').factory('User', ['$resource', function ($resource) {
  return $resource('/auth/users/:id/', {}, {
    'update': {
      method: 'PUT'
    }
  });
}]);
