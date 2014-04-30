'use strict';
 
angular.module('testProjectApp')
  .controller('AddCustomerCtrl', function ($rootScope, $scope, $location, CustomerService) {
    $scope.lastName = '';
    $scope.firstName = '';
    $scope.email = '';
    $scope.tel = '';
    $scope.street = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zip = '';
    // 50 US states plus District of Columbia
    $scope.states = [ {name:'Alabama'}, {name:'Alaska'}, {name:'Arizona'}, {name:'Arkansas'}, {name:'California'}, {name:'Colorado'}, {name:'Connecticut'}, {name:'Delaware'}, {name:'District of Columbia'}, {name:'Florida'}, {name:'Georgia'}, 
          {name:'Hawaii'}, {name:'Idaho'}, {name:'Illinois'}, {name:'Indiana'}, {name:'Iowa'}, {name:'Kansas'}, {name:'Kentucky'}, {name:'Louisiana'}, {name:'Maine'}, {name:'Maryland'},
          {name:'Massachusetts'}, {name:'Michigan'}, {name:'Minnesota'}, {name:'Mississippi'}, {name:'Missouri'}, {name:'Montana'}, {name:'Nebraska'}, {name:'Nevada'}, {name:'New Hampshire'}, {name:'New Jersey'},
          {name:'New Mexico'}, {name:'New York'}, {name:'North Carolina'}, {name:'North Dakota'}, {name:'Ohio'}, {name:'Oklahoma'}, {name:'Oregon'}, {name:'Pennsylvania'}, {name:'Rhode Island'}, {name:'South Carolina'},
          {name:'South Dakota'}, {name:'Tennessee'}, {name:'Texas'}, {name:'Utah'}, {name:'Vermont'}, {name:'Virginia'}, {name:'Washington'}, {name:'West Virginia'}, {name:'Wisconsin'}, {name:'Wyoming'}];
    
    // adds a customer
    // takes values entered by user into form and sends data to server to be saved   
    $scope.addCustomer = function () {
      var lastName = $scope.lastName;
      var firstName = $scope.firstName;
      var email = $scope.email;
      var tel = $scope.tel;
      var street = $scope.street;
      var city = $scope.city;
      var state = $scope.state.name;
      var zip = $scope.zip;
    
      if (lastName === '' || firstName === '' || email === '' || tel === '' || street === '' || city === '' || state === '' || zip === '') {
        $scope.errorText = 'Please fill in all required fields.';
      } else {
        $scope.errorText = '';
        var promise = CustomerService.addCustomer(lastName, firstName, email, tel, street, city, state, zip);
        promise.then(
          function(data) {
            $location.path('/listCustomers');
          },
          function(data) {
            $scope.errorText = data.errMessage;
          }
        );
      }
    }
    
    $scope.cancel = function () {
      $location.path('/listCustomers');
    }
  });