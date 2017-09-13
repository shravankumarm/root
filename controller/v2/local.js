var async = require('async');
var request = require('request');
var moment = require('moment');
var CronJob = require('cron').CronJob;
const User = require('../../model/user_registration_model').UsersRegistration
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('../../db/connection');
var sendEmail =  require('./sending_email');
var sendSms = require('./sending_sms');
var apiData = require('../../api_data.json');
var fs = require('file-system');


new CronJob('*/10 * * * * *', function() {

	console.log('You will see this message every 30 seconds');

   	User.find({},'email phonenumber',function(err, result){
	   	if(err){
	   		console.log(err)
	   	}else{
	   		var users_email_list = result.map(function(obj){ return obj.email });
			var users_phonenumber_list = result.map(function(obj){ return obj.phonenumber });
	   	}

	   	fs.readFile('api_data.json', readFile);
		function readFile(err, response){
			if(err){
				console.log(err)
			}else{
		 		var body = response;
		 		var individual_key = JSON.parse(body);
		 		var result = individual_key.data[0].results[0]
		 		var property_to_send_url_array = result[0].host_url;
		 		var property_to_send_name_array = result[0].name;
		 		console.log(property_to_send_url_array)
		 		sendEmail.sendgrid_email_setup(users_email_list,property_to_send_url_array,property_to_send_name_array);
					
			}
		}
   })
}, null, true, 'America/Los_Angeles');
