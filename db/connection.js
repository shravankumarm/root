var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('../model/user_registration_model');
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

//mongoose.connect(process.env.DB_CONNECTION);

var db_connection = mongoose.connection;
 
db_connection.on('error', function (err) {
  console.log('connection error', err);
});
db_connection.once('open', function () {
  console.log('connected.');
});

exports.db_connection = db_connection;