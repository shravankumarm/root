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


var todayDate = moment();
var current_date = todayDate.format("MMDDYYYY");
var todo_date = todayDate.add(7, 'days').format("MMDDYYYY");
var venue = "KovZpZA7AAEA" ;
var apiUrl_qa = `http://qa-api.msg.com/v2/shows?start_date=${current_date}&end_date=${todo_date}`;
var apiUrl_dev = `http://dev-api.msg.com/v2/shows?start_date=${current_date}&end_date=${todo_date}`;
var apiProd_prod = `http://api.msg.com/v2/shows?start_date=${current_date}&end_date=${todo_date}`;
console.log(apiProd_prod)

new CronJob('0 */1 * * *', function() {

	console.log('You will see this message every 30 seconds');

   	User.find({},'email phonenumber',function(err, result){
	   	if(err){
	   		console.log(err)
	   	}else{
	   		var users_email_list= result.map(function(obj){ return obj.email });
			var users_phonenumber_list = result.map(function(obj){ return obj.phonenumber });
	   	}

	   	request(apiProd_prod, function(error, response) {
		 	if (!error && response.statusCode == 200) {
			  	// for dates api
			  	// var body = response.body;
			  	// var individual_key = JSON.parse(body);
			  	// var result_key = individual_key.data.result;
			 	// var flow_selector = result_key['1-8'];
			 	// var getting_param = flow_selector[0];
			 	// var property_to_send = getting_param.date
			 	// console.log(property_to_send);

		 		//for shows api
		 		var body = response.body;
		    	var individual_key = JSON.parse(body);
		   		var result_key = individual_key.data.results;
		   		var property_to_send_url_array = [];
		   		var property_to_send_name_array = [];
		   		for(var i = 0; i < result_key.length; ++i){
		   			var show_availability = result_key[i].is_sold_out;
		   			if(show_availability == false){
		   				var number_of_seats = result_key[i].available_seats;
				 		var property_to_send_url = result_key[i].host_url;
				 		var property_to_send_name = result_key[i].name;
				 		property_to_send_url_array.push(property_to_send_url);
				 		property_to_send_name_array.push(property_to_send_name);
				 		console.log(number_of_seats);
			 		}else{
			 			console.log("show has been sold out")
			 		}
		 		}
		 		sendEmail.sendgrid_email_setup(users_email_list,property_to_send_url_array,property_to_send_name_array);
		 		sendSms.twilio_sms_setup(users_phonenumber_list,property_to_send_url_array,property_to_send_name_array);
  			}
		})
   })
}, null, true, 'America/Los_Angeles');

