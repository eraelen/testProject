'use strict';
var q = require('q');
var fs = require('fs');

/**
 * Reads pseudo database directory and returns data from individual customer records saved as .json files.
 * Customer records are saved in individual .json files with the format customerN.json wherein N is a unique ID associated to the customer.
 * @return deferred.promise   promise instance of deferred object that holds completion (success or failure) of task 
 */
function getCustomers () {
  var deferred = q.defer();
  var customerList = [];
  
  fs.readdir('./customers/', function (err, files) {
    if (err) {
      deferred.reject({ status: 'ERROR_READING_CUSTOMERS',
            errMessage: 'Error in reading customer records.'});
    } else if (files.length === 0){
      deferred.resolve({ status: 'NO_CUSTOMERS_FOUND',
            sucMessage: 'No customer records available.',
            customerList: customerList});
    } else {
      for (var i=0; i<files.length; i++) {
        var f = fs.readFileSync("./customers/" + files[i]);
        var customerData = JSON.parse(f);
        customerList.push(customerData[0]);
      }
      deferred.resolve({ status: 'CUSTOMERS_FOUND',
            sucMessage: 'Customers successfully found.',
            customerList: customerList});
    }
  }); 

  return deferred.promise;
}

/**
 * Deletes a customer record.
 * Customer to be deleted is searched using the id parameter passed.
 * @param id      id of customer to be deleted
 * @return deferred.promise   promise instance of deferred object that holds completion (success or failure) of task 
 */
function delCustomer (id) {
  var deferred = q.defer();
  var fileTBD = './customers/customer'+id+'.json';
  
  fs.unlink(fileTBD, function (err) {
    if (err) {
      deferred.reject({ status: 'ERROR_DELETING_CUSTOMER',
                      errMessage: 'Error in deleting customer.'});
    } else {
      var promise = getCustomers();
      promise.then( 
        function (data) {
          deferred.resolve({ status: 'CUSTOMER_DELETED',
                      sucMessage: 'Customer successfully deleted.',
                      customerList: data.customerList});
        },
        function (data) {
          deferred.reject({ status: data.status,
                      errMessage: data.message});
        }
      );
    }
  });
  
  return deferred.promise;
}

/**
 * Generates unique ID.
 * Unique ID is calculated using a simple method, i.e. add 1 to the highest ID that exists.
 * @param files     json files of customers
 * @return nextID   id of customer to be added
 */
function getID (files) {
  var nextID;
  
  if (files.length === 0) {
    nextID = 1;
  } else {
    files.sort();
    var lastFileName = files[files.length-1];
    // get highest id generated so far with assumption file name format is customerN.json
    var highestID = lastFileName.substring(8, lastFileName.indexOf('.'));
    nextID = eval(highestID) + 1;
  }
  
  return nextID;
}

/**
 * Creates a new customer record.
 * @param lastName    last name of customer
 * @param firstName   first name of customer
 * @param email       email address of customer
 * @param tel         telephone number of customer
 * @param street      street address of customer
 * @param city        city of customer
 * @param state       state of customer
 * @param zip         zipcode of customer
 * @return deferred.promise   promise instance of deferred object that holds completion (success or failure) of task 
 */
function addCustomer (lastName, firstName, email, tel, street, city, state, zip) {
  var deferred = q.defer();
  
  fs.readdir('./customers/', function (err, files) {
    if (err) {
      deferred.reject({ status: 'ERROR_READING_DIRECTORY',
                      errMessage: 'Error in reading customer directory.'});
    } else {
      var nextID = getID(files);
      var fileTBW = './customers/customer' + nextID.toString() + '.json';
      var stringData = '[{ "id": "' + nextID.toString() + '", ' +
                          '"lastName": "' + lastName + '", ' +
                          '"firstName": "' + firstName + '", ' +
                          '"email": "' + email + '", ' +
                          '"telephone": "' + tel + '", ' +
                          '"street": "' + street + '", ' +
                          '"city": "' + city + '", ' +
                          '"state": "' + state + '", ' +
                          '"zip": "' + zip + '" }]';
      var jsonData = JSON.parse(stringData);
      var dataTBW = JSON.stringify(jsonData,null,4);
      
      fs.writeFileSync(fileTBW, dataTBW);
      var promise = getCustomers();
      promise.then(
        function (data) {
          deferred.resolve({ status: 'CUSTOMER_ADDED',
                      sucMessage: 'Customer successfully added.',
                      customerList: data.customerList});
        }, function (data) {
          deferred.reject({ status: 'ERROR_ADDING_CUSTOMER',
                      errMessage: 'Error in adding customer.'});
        }
      );
    }
  });
  
  return deferred.promise;
}

/**
 * Updates an individual customer record with passed parameters.
 * @param id          id of the customer being updated
 * @param lastName    new last name of customer
 * @param firstName   new first name of customer
 * @param email       new email address of customer
 * @param tel         new telephone number of customer
 * @param street      new street address of customer
 * @param city        new city of customer
 * @param state       new state of customer
 * @param zip         new zipcode of customer
 * @return deferred.promise   promise instance of deferred object that holds completion (success or failure) of task 
 */
function updateCustomer (id, lastName, firstName, email, tel, street, city, state, zip) {
  var deferred = q.defer();
  
  var fileTBU = './customers/customer' + id.toString() + '.json';
  var fileTBW = './customers/customer' + id.toString() + '.json';
  var stringData = '[{ "id": "' + id.toString() + '", ' +
                      '"lastName": "' + lastName + '", ' +
                      '"firstName": "' + firstName + '", ' +
                      '"email": "' + email + '", ' +
                      '"telephone": "' + tel + '", ' +
                      '"street": "' + street + '", ' +
                      '"city": "' + city + '", ' +
                      '"state": "' + state + '", ' +
                      '"zip": "' + zip + '" }]';
  var jsonData = JSON.parse(stringData);
  var dataTBU = JSON.stringify(jsonData,null,4);
    
  fs.writeFileSync(fileTBU, dataTBU);
  
  var promise = getCustomers();
  promise.then(
    function (data) {
      deferred.resolve({ status: 'CUSTOMER_UPDATED',
                  sucMessage: 'Customer successfully updated.',
                  customerList: data.customerList});
    }, function (data) {
      deferred.reject({ status: data.status,
                  errMessage: data.errMessage});
    }
  );
  
  return deferred.promise;
}

exports.getCustomers = getCustomers;
exports.delCustomer = delCustomer;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;