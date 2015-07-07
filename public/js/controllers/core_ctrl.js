'use strict';

angular
  .module('meanapp.controllers')
  .controller('CoreCtrl', ['$rootScope', function($rootScope) {

  var vm = this;

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    vm.navPoint = 'index';

    if (toState.name.indexOf('users') > -1) {
      vm.navPoint = 'users';
    }
  });
}]);
