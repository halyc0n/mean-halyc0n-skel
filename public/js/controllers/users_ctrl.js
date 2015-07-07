'use strict';

angular
  .module('meanapp.controllers')
  .controller('UsersCtrl', ['User', function(User) {

  var vm = this;
  vm.users = User.all();
}]);
