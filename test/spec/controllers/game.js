'use strict';

describe('Controller: GameCtrl', function() {
  beforeEach(module('NordicArtsApp'));

  var GameCtrl;
  var scope;
  var $httpBackend;
  var game;
  var games;
  var routeParams;
  var $controller;

  beforeEach(inject(function(_$httpBackend_, _$controller_, $rootScope) {
    $httpBackend  = _$httpBackend_;
    $controller   = _$controller_;
    scope         = $rootScope.$new();

    // Mock Blog
    game = {
      name: 'test',
      id: 1
    }

    // Mock Blogs
    games = [
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

  it('should get a game from route params', function() {
    routeParams.gameId = game.id;
    GameCtrl          = $controller('GameCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });

    $httpBackend.expectGET('api/games/' + game.id).respond(game);
    scope.findOne();
    $httpBackend.flush();
    expect(scope.game.name).toBe(game.name);
  });

  it('should get array of games from route', function() {
    GameCtrl = $controller('GameCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    
    $httpBackend.expectGET('api/games').respond(games);
    scope.find();
    $httpBackend.flush();
    expect(scope.games[0].name).toBe(games[0].name);
    expect(scope.games[1].name).toBe(games[1].name);
  });
});