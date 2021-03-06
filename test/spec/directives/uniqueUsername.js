'use strict';

describe('Directive: uniqueUsername', function() {
  beforeEach(module("NordicArtsApp"));

  var element;
  var container;
  var scope;
  var $httpBackend;

  beforeEach(inject(function($rootScope, $compile, _$httpBackend_) {
    $httpBackend  = _$httpBackend_;
    scope         = $rootScope.$new();
    container     = angular.element('<form name="form"></form>');
    element       = angular.element('<input ng-model="model" name="model" unique-username />');
    container.append(element);

    container = $compile(container)(scope);
    scope.$digest();
  }));

  it('should set error to true if name exists', inject(function($compile) {
    $httpBackend.expectGET('/auth/check_username/bob').respond({
      exists: true
    });
    expect(scope.form.model.$error.unique).toBe(false);

    scope.model = 'bob';
    scope.$digest();
    $httpBackend.flush();

    expect(scope.form.model.$error.unique).toBe(true);
  }));

  it('should set error to false if name does not exist', inject(function($compile) {
    $httpBackend.expectGET('/auth/check_username/geoff').respond({
      exists: false
    });

    scope.form.model.$error.unique = true;
    scope.model = 'geoff';
    scope.$digest();
    $httpBackend.flush();

    expect(scope.form.model.$error.unique).toBe(false);
  }));
});