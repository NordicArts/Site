'use strict';

angular.module('NordicArtsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  
  'appRoutes'
]).run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
  $rootScope.$watch('currentUser', function(currentUser) {
    var isValidPath = false;
    var validPaths  = [
      /^\/$/,
      /^\/blogs$/,
      /^\/blogs\/[0-9a-zA-Z]*$/,
      /^\/login$/,
      /^\/logout$/,
      /^\/signup$/,
      /^\/changepassword$/
    ];
    var path = $location.path();    
    
    for (var i = 0; i < validPaths.length; i++) {
      if (path.search(validPaths[i]) >= 0) {
        isValidPath = true;
        break;
      }
    }
    if (!currentUser && !isValidPath) {
      Auth.currentUser();
    }
  });
  
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    
    return false;
  });
}]);