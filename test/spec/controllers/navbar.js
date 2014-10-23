'use strict';

describe('Controller: NavbarCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var NavbarCtrl;
  var scope;
  var $httpBackend;

  beforeEach(inject(function($controller, $rootScope) {
    scope       = $rootScope.$new();
    NavbarCtrl  = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));
});