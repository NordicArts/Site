var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = function(db) {
  // User Levers
  var userLevel = mongoose.model('UserLevel');
  userLevel.findByLevel('UnRegistered', function(error, result) {
    if (error) {
      console.log('User Level Error:', error);
    }
    if (result === null) {
      var insert;
      insert = new userLevel({ level: 'UnRegistered' }).save();
      insert = new userLevel({ level: 'Registered' }).save();
      insert = new userLevel({ level: 'Admin' }).save();
      insert = new userLevel({ level: 'SuperAdmin' }).save();
    }
    return;
  });
  var getUserLevelId = function(level) {
    var userid = userLevel.findByLevel('SuperAdmin', function(error, result) {
      if (error) {
        console.log("Get Level Error:", error);
      }
      return result;
    });
    return ObjectId(level._id);
  };
  
  // User
  var user = mongoose.model('User');
  user.findByName('Keloran', function(error, result) {
    if (error) {
      console.log('User Error: ', error);
    }
    if (result === null) {      
      var insert;
      insert = new user({
        username: 'Keloran',
        password: 'password',
        email: 'keloran@nordicarts.net',
        level: getUserLevelId('SuperAdmin'),
        forcePasswordChange: true,
        provider: 'PrePopulate'
      }).save();
      insert = new user({
        username: 'wd40',
        password: 'password',
        email: 'wd40@nordicarts.net',
        level: getUserLevelId('SuperAdmin'),
        forcePasswordChange: true,
        provider: 'PrePopulate'
      }).save();
    }
    return;
  })
};
