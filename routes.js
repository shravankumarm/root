module.exports = function(app){
	var users_registration_controller = require('./controller/user_registration_controller');

	app.get('/',function(req,res){
		res.render('user_registration');
	});
	
	app.post('/userregistration',users_registration_controller.userregistration,function(req,res){
		 //res.redirect('/');
		 //res.send({redirect: '/'});
	})
	app.get('/success',function(req,res){
		res.render('success_msg')
	})
 }