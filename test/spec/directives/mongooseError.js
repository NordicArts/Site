'use strict';

describe('Directive: mongooseError', function() {
  beforeEach(module('NordicArtsApp'));

  var element;
  var container;
  var scope;
  var $httpBackend;

  beforeEach(inject(function($rootScope, $compile) {
    scope      = $rootScope.$new();
    container  = angular.element('<form name="form"></form>');
    element    = angular.element('<input ng-model="model" name="model" mongoose-error />');
    container.append(element);

    container = $compile(container)(scope);
    scope.$digest();
  }));

  it('should set error to false on keypress', inject(function($compile) {
    scope.form.model.$error.mongoose = true;

    browserTrigger(element, 'keydown');
    scope.$digest();
    
    console.log(scope.form.$error);

    expect(scope.form.model.$error.mongoose).toBe(false);
  }));
});