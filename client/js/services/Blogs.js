'use strict';

angular.module('NordicArtsApp').factory('Blogs', ['$resource', function ($resource) {
  return $resource('api/blogs/:blogId', {
    blogId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
