'use strict';

var mongoose    = require('mongoose'),
    bcrypt      = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = mongoose.model('User', userSchema, 'users');
