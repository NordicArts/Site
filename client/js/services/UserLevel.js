'use strict';

angular.module('NordicArtsApp').service('UserLevelService', function() {
  
});

angular.module('NordicArtsApp').factory('UserLevel', ['$resource', function($resource) {
  return $resource('/api/check/', {}, {
    'check': {
      method: 'POST'
    }
  });
}]);