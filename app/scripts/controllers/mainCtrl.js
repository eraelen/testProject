'use strict';

angular.module('testProjectApp')
  .controller('MainCtrl', function ($scope, $location, CustomerService) {
    $scope.tasks = [
      { name: 'List Customers',
        description: 'List all customer records by clicking "List Customers" at the top. Customers are listed in alphabetical order according to last name.' },
      { name: 'Add New Customer',
        description: 'Register a new customer by clicking on "Add New Customer" at the top.' },
      { name: 'Search Customer',
        description: 'To easily find a customer, go to "List Customers" then type your query on the search box.' },
      { name: 'Delete Customer',
        description: 'To delete a customer, go to "List Customers" then click on the red X icon of the customer record you wish to delete.' },
      { name: 'Update Customer',
        description: 'To edit a customer, go to "List Customers" then click on the blue pencil icon of the customer record you wish to update.' }
    ];
  });
