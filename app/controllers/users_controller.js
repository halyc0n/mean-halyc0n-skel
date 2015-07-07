'use strict';

var User = require('../models/user');

module.exports = function(app, router) {
  router.route('/')
    .get(function(req, res) {
      User.find({}, function(err, users) {
        if (err) throw err;

        res.json(users);
      });
    });

  app.use('/users', router);
};
