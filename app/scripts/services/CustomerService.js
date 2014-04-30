'use strict';
 
angular.module('testProjectApp')
    .factory('CustomerService', function ($http, $q, $rootScope, $location) {
      // Public API here
      return {
        getCustomers : function () {
          var deferred = $q.defer();
          $http({
            url: '/getCustomers',
            method: 'GET'
          })
          .then( function (data) {
            if (data.data.status === 'CUSTOMERS_FOUND' || data.data.status === 'NO_CUSTOMERS_FOUND') {
              deferred.resolve(data.data);
            } else {
              deferred.reject(data.data.message);
            }
          });
          return deferred.promise;
        },
        
        delCustomer : function (id) {
          var deferred = $q.defer();
          $http({
            url: '/delCustomer',
            method: 'POST',
            data: { id : id }
          })
          .then( function (data) {
            if (data.data.status === 'CUSTOMER_DELETED') {
              deferred.resolve(data.data);
            } else { 
              deferred.reject(data.data.message);
            }
          });
          return deferred.promise;
        },
        
        addCustomer : function (lastName, firstName, email, tel, street, city, state, zip) {
          var deferred = $q.defer();
          $http({
            url: '/addCustomer',
            method: 'POST',
            data: { lastName: lastName, 
                    firstName: firstName, 
                    email: email, 
                    tel: tel, 
                    street: street, 
                    city: city, 
                    state: state, 
                    zip: zip
            }
          })
          .then( function (data) {
            if (data.data.status === 'CUSTOMER_ADDED') {
              deferred.resolve(data.data);
            } else { 
              deferred.reject(data.data.message);
            }
          });
          return deferred.promise;
        },
        
        updateCustomer : function (id, lastName, firstName, email, tel, street, city, state, zip) {
          var deferred = $q.defer();
          $http({
            url: '/updateCustomer',
            method: 'POST',
            data: { id : id,
                    lastName: lastName, 
                    firstName: firstName, 
                    email: email, 
                    tel: tel, 
                    street: street, 
                    city: city, 
                    state: state, 
                    zip: zip
            }
          })
          .then( function (data) {
            if (data.data.status === 'CUSTOMER_UPDATED') {
              deferred.resolve(data.data);
            } else { 
              deferred.reject(data.data.errMessage);
            }
          });
          return deferred.promise;
        }
      };
    });