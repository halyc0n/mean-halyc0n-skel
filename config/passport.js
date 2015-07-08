'use strict';

var LocalStrategy  = require('passport-local'),
    User           = require('../app/models/user'),
    Q              = require('q'),
    debug          = require('debug'),
    error          = debug('passport:error'),
    findUser       = Q.nbind(User.findOne, User);

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    findUser({ 'username': username }).
      then(function(user) {
        if (user)
          return done(null, false, req.flash('signupMessage', 'This username is already taken.'));

          var newUser = new User({
            username: username,
            password: password
          });

          return [newUser, Q.ninvoke(newUser, "save")];
      }).
      spread(function(newUser) {
        return done(null, newUser)
      }).fail(function(err) {
        error(err);
      });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    findUser({ 'username': username }).
      then(function(user) {
        if (!user)
          return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));

        return [user, Q.ninvoke(user, "validPassword", password)];
      }).
      spread(function(user, res) {
        if (!res)
          return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));

        return done(null, user);
      }).fail(function(error) {
        error(err);
      });
  }));
};
