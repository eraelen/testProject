'use strict';
 
angular.module('testProjectApp')
  .controller('ListCustomersCtrl', ['$scope', '$location', '$modal', 'CustomerService', 
    function ($scope, $location, $modal, CustomerService) {
    
    // initializes $scope.customers
    var promiseGet = CustomerService.getCustomers();
    promiseGet.then(
      function (data) {
        $scope.customers = data.customerList;
        if (data.status === 'NO_CUSTOMERS_FOUND') $scope.successText = data.sucMessage;
      },
      function (data) {
        $scope.errorText = data.errMessage;
      });
    
    // deletes customer using id passed from view
    $scope.delCustomer = function (id) {
      var promiseDel = CustomerService.delCustomer(id);
      promiseDel.then( 
        function (data) {
          $scope.customers = data.customerList;
          $scope.successText = data.sucMessage;
        },
        function (data) {
          $scope.errorText = data.errMessage;
        });
    }
    
    //re-routes to add customer view
    $scope.addCustomer = function () {
      $location.path('/addCustomer');
    }
    
    //updates customer
    $scope.updateCustomer = function (oldCustomerInfo) {
      var modalInstance = $modal.open({
        templateUrl: 'updateCustomer.html',
        controller: UpdateCustomerCtrl,
        resolve: {
          oldCustomerInfo: function () {
            return oldCustomerInfo;
          }
        }
      });
      modalInstance.result.then(
        function (data) {
          $scope.successText = data.sucMessage;
          $scope.customers = data.customerList;
        },
        function (data) {
          $scope.errorText = data.errMessage;
        }
      );
    }
  }]);

// controller for the modal to update customer  
var UpdateCustomerCtrl = function ($scope, $modalInstance, CustomerService, oldCustomerInfo) {
  $scope.states = [ {name:'Alabama'}, {name:'Alaska'}, {name:'Arizona'}, {name:'Arkansas'}, {name:'California'}, {name:'Colorado'}, {name:'Connecticut'}, {name:'Delaware'}, {name:'District of Columbia'}, {name:'Florida'}, {name:'Georgia'}, 
          {name:'Hawaii'}, {name:'Idaho'}, {name:'Illinois'}, {name:'Indiana'}, {name:'Iowa'}, {name:'Kansas'}, {name:'Kentucky'}, {name:'Louisiana'}, {name:'Maine'}, {name:'Maryland'},
          {name:'Massachusetts'}, {name:'Michigan'}, {name:'Minnesota'}, {name:'Mississippi'}, {name:'Missouri'}, {name:'Montana'}, {name:'Nebraska'}, {name:'Nevada'}, {name:'New Hampshire'}, {name:'New Jersey'},
          {name:'New Mexico'}, {name:'New York'}, {name:'North Carolina'}, {name:'North Dakota'}, {name:'Ohio'}, {name:'Oklahoma'}, {name:'Oregon'}, {name:'Pennsylvania'}, {name:'Rhode Island'}, {name:'South Carolina'},
          {name:'South Dakota'}, {name:'Tennessee'}, {name:'Texas'}, {name:'Utah'}, {name:'Vermont'}, {name:'Virginia'}, {name:'Washington'}, {name:'West Virginia'}, {name:'Wisconsin'}, {name:'Wyoming'}];
  $scope.lastName = oldCustomerInfo.lastName;
  $scope.firstName = oldCustomerInfo.firstName;
  $scope.email = oldCustomerInfo.email;
  $scope.tel = oldCustomerInfo.telephone;
  $scope.street = oldCustomerInfo.street;
  $scope.city = oldCustomerInfo.city;
  $scope.state = oldCustomerInfo.state;
  $scope.zip = oldCustomerInfo.zip;  

  // updates customer record
  // upon closing, data is sent back to $scope.updateCustomer
  $scope.update = function (lastName, firstName, email, tel, street, city, state, zip) {
    if (lastName === '' || firstName === '' || email === '' || tel === '' || street === '' || city === '' || state === '' || zip === '') {
      $scope.errorText = 'Please fill in all required fields.';
    } else {
      $scope.errorText = '';
      var promise = CustomerService.updateCustomer(oldCustomerInfo.id, lastName, firstName, email, tel, street, city, state, zip);
      promise.then(
        function(data) {
          $modalInstance.close(data);
        },
        function(data) {
          $modalInstance.close(data);
        }
      );    
    }
  }
  
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}