'use strict';

angular.module('NordicArtsApp').factory('Auth', ['$location', '$rootScope', 'Session', 'User', '$cookieStore', 'UserLevel', function Auth($location, $rootScope, Session, User, $cookieStore, UserLevel) {
  $rootScope.currentUser = ($cookieStore.get('user') || null);
  $cookieStore.remove('user');
  $rootScope.adminUser = function() {      
    if (!$rootScope.currentUser) {
      return null;
    }
    
    UserLevel.check({
      levels: ["Admin", "SuperAdmin"],
      userid: $rootScope.currentUser._id
    }, function(allowed) {
      return true;
    }, function(err) {
      return null;
    });
  };

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
    
    adminLevel: function() {
      checkLevel(['Admin'], function(error, allowed) {        
        if (allowed) {
          if (allowed.allowed) {
            $rootScope.adminLevel = true;
          }
        }
      });
    },
    
    checkLevel: function(levels, callback) {
      var cb = (callback || angular.noop);
      
      if (!$rootScope.currentUser) {
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

    changePassword: function(oldPassword, newPassword, callback) {
      var cb = (callback || angular.noop);
      User.updatePassword({
        userid: $rootScope.currentUser._id,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        return cb(null, "Password updated");
      }, function(err) {
        return cb(err.data);
      });
    },
    
    checkPasswordStatus: function(callback) {
      var cb = (callback || angular.noop);
      return cb($rootScope.currentUser.forceChangePassword);
    },

    removeUser: function(email, password, callback) {
      var cb = (callback || angular.noop);
      User.delete({
        email: email,
        password: password
      }, function(user) {
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    }
  };
}]);