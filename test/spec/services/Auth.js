'use strict';

describe('Service: Auth', function() {
  beforeEach(module('NordicArtsApp'));

  var Auth;
  var user;
  var $rootScope;
  var $httpBackend;

  var sessionURL = '/auth/session';
  var userURL = '/auth/users';

  beforeEach(inject(function(_Auth_, _$rootScope_, _$httpBackend_) {
    Auth         = _Auth_;
    $rootScope   = _$rootScope_;
    $httpBackend = _$httpBackend_;

    // Mock User
    user = {
      'email': 'test',
      'password': 'pass',
      'username': 'bob'
    };
  }));

  // Login
  it('should login and set global user', function() {
    $httpBackend.expectPOST(sessionURL).respond(user);
    expect($rootScope.currentUser).toBe(null);

    Auth.login("password", user);
    $httpBackend.flush();

    expect($rootScope.currentUser.username).toBe(user.username);
  });

  // Logout
  it('should logout and remove global user', function() {
    $httpBackend.expectDELETE(sessionURL).respond({});

    $rootScope.currentUser = user;
    expect($rootScope.currentUser.username).toBe(user.username);

    Auth.logout();
    $httpBackend.flush();

    expect($rootScope.currentUser).toBe(null);
  });

  // Register
  it('should register user and set global user', function() {
    $httpBackend.expectPOST(userURL).respond(user);
    expect($rootScope.currentUser).toBe(null);

    Auth.createUser(user);
    $httpBackend.flush();

    expect($rootScope.currentUser.username).toBe(user.username);
  });
});