'use strict';

var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var crypto        = require('crypto');
var ObjectId      = mongoose.Types.ObjectId;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: String,
  salt: String,
  admin: Boolean,
  provider: String,
  forceChangePassword: {
    type: Boolean,
    default: false
  },
  level: {
    type: Schema.ObjectId,
    ref: 'UserLevel'
  }
});

UserSchema.virtual('password').set(function(password) {
  this._password       = password;
  this.salt            = this.makeSalt();
  this.hashedPassword  = this.encryptPassword(password);
}).get(function() {
  return this._password;
});
UserSchema.virtual('user_info').get(function() {
  return {
    '_id': this._id,
    'username': this.username,
    'email': this.email,
    'level': this.level,
    'forceChangePassword': this.forceChangePassword
  };
});

var validatePresenceOf = function(value) {
  return (value && value.length);
};

UserSchema.path('email').validate(function(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.+[\w-]{2,4}))?$/;
  return emailRegex.test(email);
}, 'Email invalid');
UserSchema.path('email').validate(function(value, respond) {
  mongoose.models['User'].findOne({
    email: value
  }, function(error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      return respond(user);
    }
    respond(true);
  });
}, 'Email in use');
UserSchema.path('username').validate(function(value, respond) {
  mongoose.models['User'].findOne({
    username: value
  }, function(error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      return respond(user);
    }
    respond(true);
  });
}, 'Username in use');

UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }
  
  if (this.provider != "LocalProvider") {
    next();
  }
  
  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  } else {    
    next();
  }
});

UserSchema.methods = {
  authenticate: function(plainText) {
    return (this.encryptPassword(plainText) === this.hashedPassword);
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword: function(password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

UserSchema.statics.findByName = function(name, callback) {
  return this.findOne({
    username: name
  }, callback);
};

UserSchema.statics.createByProvider = function(providerDetails, callback) {  
  console.log("Provider", providerDetails);
  
  if (!providerDetails.username) {
    if (providerDetails.displayName) {
      providerDetails.username = providerDetails.displayName.replace(' ', '');
    } else {
      return callback('Provider Details are broken');
    }
  }
  
  
  // if the account already exists
  this.findOne({
    username: providerDetails.username
  }, function(findError, userDetails) {
    if (userDetails) {
      if (userDetails.provider === providerDetails.provider) {
        return callback(findError, userDetails);
      } else {
        return callback('User created with different provider');
      }
    }
    
    // create the account
    mongoose.models['UserLevel'].findByLevel('Registered', function(levelErr, level) {
      mongoose.models['User'].create({
        username: providerDetails.username,
        provider: providerDetails.provider,
        email: (providerDetails.username + '@' + providerDetails.provider + '.com'),
        level: level._id
      }, function(createErr, createdUser) {
        return callback(createErr, createdUser);
      });
    });
  });
};

mongoose.model('User', UserSchema);