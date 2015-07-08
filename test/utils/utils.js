'use strict';

var User = require('../../app/models/user');

module.exports = {
  createUser: function(cb) {
    var user = new User();
    user.username = 'test_username';
    user.password = 'test_password';
    user.save(cb);
  }
}
