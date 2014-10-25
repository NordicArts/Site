'use strict';

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl'
  }).when('/blogs', {
    templateUrl: 'partials/blogs/list.html',
    controller: 'BlogsCtrl'
  }).when('/blogs/create', {
    templateUrl: 'partials/blogs/create.html',
    controller: 'BlogsCtrl'
  }).when('/blogs/:blogId/edit', {
    templateUrl: 'partials/blogs/edit.html',
    controller: 'BlogsCtrl'
  }).when('/blogs/:blogId', {
    templateUrl: 'partials/blogs/view.html',
    controller: 'BlogsCtrl'
  }).when('/login', {
    templateUrl: 'partials/user/login.html',
    controller: 'LoginCtrl'
  }).when('/signup', {
    templateUrl: 'partials/user/signup.html',
    controller: 'SignupCtrl'
  }).when('/changepassword', {
    templateUrl: 'partials/user/password.html',
    controller: 'PasswordCtrl'
  }).otherwise({
    redirectTo: '/'
  });
  
  $locationProvider.html5Mode(true);
}]);