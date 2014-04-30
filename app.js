var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var CONFIG = require('config');
var fs = require('fs');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/app');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

app.engine('html', require('ejs').renderFile);

var server;

app.configure('development', function () {
    // Configuration for development environments.
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use('/app', express.static(__dirname + '/app'));
    app.use(express.static(path.join(__dirname, '/app')));
    app.use(express.logger('dev'));
    app.use(express.errorHandler({ dumpExceptions: true,
        showStack: true }));
    server = http.createServer(app);
});

app.get('/', function (req, res) {
    res.render('index.html', { title: 'Express' });
});

var api = require('./server/routes/api');
app.get('/getCustomers', api.customer.getCustomers);
app.post('/delCustomer', api.customer.delCustomer);
app.post('/addCustomer', api.customer.addCustomer);
app.post('/updateCustomer', api.customer.updateCustomer);

server.listen(app.get('port'));