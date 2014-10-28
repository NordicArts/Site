'use strict';
var mainRoutes = [
  {
    path: '/',
    template: 'partials/main.html',
    controller: 'MainCtrl',
    authLevel: []
  },
  {
    path: '/blogs',
    template: 'partials/blogs/list.html',
    controller: 'BlogsCtrl',
    authLevel: []
  },
  {
    path: '/blogs/create',
    template: 'partials/blogs/create.html',
    controller: 'BlogsCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  {
    path: '/blogs/:blogId/edit',
    template: 'partials/blogs/edit.html',
    controller: 'BlogsCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  {
    path: '/blogs/:blogId',
    template: 'partials/blogs/view.html',
    controller: 'BlogsCtrl',
    authLevel: []
  },
  {
    path: '/login',
    template: 'partials/user/login.html',
    controller: 'LoginCtrl',
    authLevel: []
  },
  {
    path: '/signup',
    template: 'partials/user/signup.html',
    controller: 'SignupCtrl',
    authLevel: []
  },
  {
    path: '/changepassword',
    template: 'partials/user/password.html',
    controller: 'PasswordCtrl',
    authLevel: ['Registered', 'Admin', 'SuperAdmin']
  }
];

angular.module('NordicArtsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  for (var route in mainRoutes) {
    $routeProvider.when(mainRoutes[route].path, {
      templateUrl: mainRoutes[route].template,
      controller: mainRoutes[route].controller
    });
  }
  
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  
  $locationProvider.html5Mode(true);
}]).run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
  // User Based
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
  
  // Auth Required
  $rootScope.$on('$routChangeStart', function(event, next, current) {
    for (var route in mainRoutes) {
      if (next.indexOf(mainRoutes[route].path) !== -1) {
        if (mainRoutes[route].authLevel.length >= 1) {
          
        }
      }
    }
  });
  
  // Login Required
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    
    return false;
  });
}]);