'use strict';

angular.module('NordicArtsApp').factory('Games', ['$resource', function ($resource) {
  return $resource('api/games/:gameId', {
    gameId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
