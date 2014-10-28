'use strict';

angular.module('NordicArtsApp').factory('Game', ['$resource', function ($resource) {
  return $resource('api/games/:gameId', {
    gameId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
