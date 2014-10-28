'use strict';

angular.module('NordicArtsApp').factory('Auth', ['$location', '$rootScope', 'Session', 'User', '$cookieStore', 'UserLevel', function Auth($location, $rootScope, Session, User, $cookieStore, UserLevel) {
  $rootScope.currentUser = ($cookieStore.get('user') || null);
  $cookieStore.remove('user');

  return {
    login: function(provider, user, callback) {
      var cb = (callback || angular.noop);
      Session.save({
        provider: provider,
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe
      }, function(user) {
        $rootScope.currentUser = user;
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    },

    logout: function(callback) {      
      var cb = (callback || angular.noop);
      Session.delete(function(res) {        
        $rootScope.currentUser = null;
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    },

    createUser: function(userinfo, callback) {
      var cb = (callback || angular.noop);
      User.save(userinfo, function(user) {
        $rootScope.currentUser = user;
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    },

    currentUser: function() {
      Session.get(function(user) {
        $rootScope.currentUser = user;
      });
    },
    
    checkLevel: function(levels, callback) {
      var cb = (callback || angular.noop);
      
      if ($rootScope.currentUser !== "undefined") {
        return cb("not allowed");
      }
      
      UserLevel.check({
        levels: levels,
        userid: $rootScope.currentUser._id
      }, function(allowed) {
        return cb(null, allowed);
      }, function(err) {
        return cb(err.data);
      });
    },

    changePassword: function(email, oldPassword, newPassword, callback) {
      var cb = (callback || angular.noop);
      User.update({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        console.log('password changed for ' + user);
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    },
    
    checkPasswordStatus: function(callback) {
      var cb = (callback || angular.noop);
      return cb($rootScope.user.forceChangePassword);
    },

    removeUser: function(email, password, callback) {
      var cb = (callback || angular.noop);
      User.delete({
        email: email,
        password: password
      }, function(user) {
        console.log(user + 'removed');
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    }
  };
}]);