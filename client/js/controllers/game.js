'use strict';

angular.module('NordicArtsApp').controller('GameCtrl', ['$scope', 'Game', '$routeParams', '$location', '$rootScope', 'Auth', function($scope, Game, $routeParams, $location, $rootScope, Auth) {
  $scope.create = function() {    
    Auth.checkLevel(
      ['Admin', 'SuperAdmin'], function(error, isAllowed) {            
        if (error) {
          $location.path("/").end();
        }
        
        if (isAllowed.allowed) {
          var game = new Game({
            title: this.title,
            content: this.content
          });
          game.$save(function(response) {
            $location.path('game/' + response._id);
          });
        }
      }
    );

    this.title = '';
    this.content = '';
  };

  $scope.remove = function(game) {
    game.$remove();

    for (var i in $scope.games) {
      if ($scope.games[i] === game) {
        $scope.games.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    var game = $scope.game;
    game.$update(function() {
      $location.path('game/' + game._id);
    });
  };

  $scope.find = function() {
    Game.query(function(games) {
      $scope.games = games;
    });
  };

  $scope.findOne = function() {
    Game.get({
      gameId: $routeParams.gameId
    }, function(game) {
      $scope.game = game;
    });
  };
}]);