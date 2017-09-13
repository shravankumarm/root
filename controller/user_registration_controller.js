const UserRegister = require('../model/user_registration_model').UsersRegistration

module.exports = {
	userregistration: function(req,res){
		req.checkBody('firstname', 'FirstName is required').notEmpty();
  		req.checkBody('lastname', 'LastName is required').notEmpty();
		req.checkBody('email', 'Enter a valid E-mail address.').isEmail();
		req.checkBody('email', 'E-mail is required').notEmpty();
		req.checkBody('phonenumber', 'Enter a valid US phone number.').isMobilePhone("en-US");

		var errors = req.validationErrors();

		if (errors) {
    		res.render('user_registration',{ flash: { type: 'alert-danger', messages: errors }});
    		return;
  		}else
  		{
			var User = new UserRegister();
			User.firstname = req.body.firstname,
			User.lastname = req.body.lastname,
			User.email = req.body.email,
			User.phonenumber = req.body.phonenumber

			User.save().then(function(users){
				console.log("saved to mongodb");
			},function(err){
				console.log("error")
			});
			res.redirect('/success');
		}
	}

}