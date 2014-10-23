'use strict';

describe('Controller: MainCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var MainCtrl;
  var scope;
  var $httpBackend;

  beforeEach(inject(function($controller, $rootScope) {
    scope    = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
});