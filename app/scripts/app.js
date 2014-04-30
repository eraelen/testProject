'use strict';

angular
  .module('testProjectApp', ['ngSanitize', 'ngRoute', 'ui', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/listCustomers', {
        templateUrl: 'views/listCustomers.html',
        controller: 'ListCustomersCtrl'
      })
      .when('/addCustomer', {
        templateUrl: 'views/addCustomer.html',
        controller: 'AddCustomerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
