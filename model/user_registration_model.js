var mongoose = require('mongoose');

//User  registration schema

var user_registration_schema = require('../schema/user_registration_schema').user_schema

module.exports.UsersRegistration = mongoose.model('UsersRegistration', user_registration_schema )