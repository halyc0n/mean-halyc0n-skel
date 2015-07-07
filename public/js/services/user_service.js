'use strict';

angular
  .module('meanapp.services')
  .factory('User', ['$resource', function($resource) {

  function User() {
    this.servise = $resource('/users');
  };

  User.prototype.all = function(cb) {
    return this.servise.query(cb);
  };

  return new User();
}]);
