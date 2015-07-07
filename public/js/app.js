'use strict';

var dependencies = [
  'meanapp.controllers',
  'meanapp.services',
  'ui.router',
  'ngResource'
];

angular
  .module('meanapp', dependencies)
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('index', {
      url: '/',
      templateUrl: 'views/index.html'
    }).state('users', {
      url: 'users',
      templateUrl: 'views/users.html'
    }).state('settings', {
      url: 'settings',
      templateUrl: 'views/settings.html'
    });
  });
