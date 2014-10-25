'use strict';

describe('Controller: SignupCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var SignupCtrl;
  var scope;
  var $httpBackend;

  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope        = $rootScope.$new();
    SignupCtrl   = $controller('SignupCtrl', {
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

  it('should set scope.errors[field] on mongoose error', function() {
    $httpBackend.expectPOST('/auth/users').respond(400, {
      errors: {
        'model': {
          type: 'Test Error'
        }
      }
    });

    scope.register(scope.optionsForm);
    $httpBackend.flush();
    expect(scope.errors.model).toBe('Test Error');
  });
});