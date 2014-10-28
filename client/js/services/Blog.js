'use strict';

angular.module('NordicArtsApp').factory('Blog', ['$resource', function ($resource) {
  return $resource('api/blogs/:blogId', {
    blogId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
