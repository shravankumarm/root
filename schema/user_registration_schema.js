var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_schema = new Schema({
		date: { type: Date, default: Date.now },
		firstname: String,
    	lastname: String,
    	email: String,
    	phonenumber: String
});



module.exports.user_schema = user_schema;