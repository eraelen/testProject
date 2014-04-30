'use strict';
var customer = require('customer');

function getCustomers (req, res) {
  customer.getCustomers()
    .then(function(s) { res.json(s); })
    .fail(function(e) { res.json(e); });
}

function delCustomer (req, res) {
  customer.delCustomer(req.body.id)
    .then(function(s) { res.json(s); })
    .fail(function(e) { res.json(e); });
}

function addCustomer (req, res) {
  customer.addCustomer(req.body.lastName, req.body.firstName, req.body.email, req.body.tel, req.body.street, req.body.city, req.body.state, req.body.zip)
    .then(function(s) { res.json(s); })
    .fail(function(e) { res.json(e); });
}

function updateCustomer (req, res) {
  customer.updateCustomer(req.body.id, req.body.lastName, req.body.firstName, req.body.email, req.body.tel, req.body.street, req.body.city, req.body.state, req.body.zip)
    .then(function(s) { res.json(s); })
    .fail(function(e) { res.json(e); });
}

module.exports = {
  customer : {
    getCustomers : getCustomers,
    delCustomer : delCustomer,
    addCustomer : addCustomer,
    updateCustomer : updateCustomer
  }  
};