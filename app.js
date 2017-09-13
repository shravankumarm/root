var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var expressvalidator = require('express-validator');
var app =  express();
require('./db/connection');
require('./controller/v2/api');

//configure view 
app.set('view engine','jade');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist',  express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressvalidator());


require('./routes')(app);

module.exports = app;