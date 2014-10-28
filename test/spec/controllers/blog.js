'use strict';

describe('Controller: BlogCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var BlogCtrl;
  var scope;
  var $httpBackend;
  var blog;
  var blogs;
  var routeParams;
  var $controller;

  beforeEach(inject(function(_$httpBackend_, _$controller_, $rootScope) {
    $httpBackend  = _$httpBackend_;
    $controller   = _$controller_;
    scope         = $rootScope.$new();

    // Mock Blog
    blog = {
      name: 'test',
      id: 1
    }

    // Mock Blogs
    blogs = [
      {
        name: 'eeny',
        id: 2
      },
      {
        name: 'mean',
        id: 3
      }
    ];

    // Params
    routeParams = {};
  }));

  it('should get a blog from route params', function() {
    routeParams.blogId = blog.id;
    BlogCtrl          = $controller('BlogCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });

    $httpBackend.expectGET('api/blog/' + blog.id).respond(blog);
    scope.findOne();
    $httpBackend.flush();
    expect(scope.blog.name).toBe(blog.name);
  });

  it('should get array of blogs from route', function() {
    BlogCtrl = $controller('BlogCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    
    $httpBackend.expectGET('api/blog').respond(blogs);
    scope.find();
    $httpBackend.flush();
    expect(scope.blogs[0].name).toBe(blogs[0].name);
    expect(scope.blogs[1].name).toBe(blogs[1].name);
  });
});