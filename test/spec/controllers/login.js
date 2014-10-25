'use strict';

describe('Controller: LoginCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var LoginCtrl;
  var scope;
  var $httpBackend;

  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend  = _$httpBackend_;
    scope          = $rootScope.$new();
    LoginCtrl      = $controller('LoginCtrl', {
      $scope: scope
    });

    // Mock Form
    scope.optionsForm                     = { model: {} };
    scope.optionsForm.model.$setValidity  = function() {};

    // Mock User
    scope.user = {
      email: '',
      password: '',
      username: ''
    };
  }));

  it('should set scope.errors[field] on mongoose errors', function() {
    $httpBackend.expectPOST('/auth/session').respond(400, {
      errors: {
        'model': {
          type: 'Test Error'
        }
      }
    });

    scope.login(scope.optionsForm);
    $httpBackend.flush();
    expect(scope.errors.model).toBe('Test Error');
  });
});