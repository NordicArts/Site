'use strict';

// The routes to use
var mainRoutes = [
  {
    path: '/',
    template: 'partials/main.html',
    controller: 'MainCtrl',
    authLevel: []
  },
  
  // Blog Stuff
  {
    path: '/blog',
    template: 'partials/blog/list.html',
    controller: 'BlogCtrl',
    authLevel: []
  },
  {
    path: '/blog/create',
    template: 'partials/blog/create.html',
    controller: 'BlogCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  {
    path: '/blog/:blogId/edit',
    template: 'partials/blog/edit.html',
    controller: 'BlogCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  {
    path: '/blog/:blogId',
    template: 'partials/blogs/view.html',
    controller: 'BlogsCtrl',
    authLevel: []
  },
  
  // Game Stuff
  {
    path: '/games',
    template: 'partials/games/list.html',
    controller: 'GameCtrl',
    authLevel: []
  },
  {
    path: '/game/:gameId',
    template: 'partials/games/view.html',
    controller: 'GameCtrl',
    authLevel: []
  },
  {
    path: 'game/create',
    template: 'partials/games/create.html',
    controller: 'GameCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  {
    path: 'game/:gameId/edit',
    template: 'partials/games/edit.html',
    controller: 'GameCtrl',
    authLevel: ['Admin', 'SuperAdmin']
  },
  
  // User Stuff
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
    path: '/user/password',
    template: 'partials/user/password.html',
    controller: 'PasswordCtrl',
    authLevel: ['Registered', 'Admin', 'SuperAdmin']
  },
  {
    path: '/forgot',
    template: 'partials/user/forgot.html',
    controller: 'PasswordCtrl',
    authLevel: []
  }
];

// Start module
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
  
  $routeProvider.when('/auth/:provider', {
    resolve: {
      redirect: ['$location', function($location) {
        window.location.replace($location.absUrl());
      }]
    }
  });
  
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
      /^\/blog$/,
      /^\/blog\/[0-9a-zA-Z]*$/,
      /^\/games$/,
      /^\/games\/[0-9a-zA-Z]*$/,
      /^\/login$/,
      /^\/logout$/,
      /^\/signup$/,
      /^\/changepassword$/,
      /^\/auth\/[a-zA-Z]*$/
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
      Auth.adminLevel();
    }
  });
  
  // Auth Required
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    var checkLevel;
    var authValid;
    
    // Auth
    if (next.indexOf('auth') !== -1) {
      authValid = true;
    }
    
    // Standard routes
    if (!authValid) {
      for (var route in mainRoutes) {
        if (next.indexOf(mainRoutes[route].path) !== -1) {
          if (mainRoutes[route].authLevel.length >= 1) {
            checkLevel = mainRoutes[route].authLevel;
          }
        }
      }

      // Check the level
      if (checkLevel) {
        Auth.checkLevel(checkLevel, function(error, isAllowed) {
          if (error) {
            $location.path('/');
          }
        });
      }
    }
  });
  
  // Login Required
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    
    return false;
  });
}]);