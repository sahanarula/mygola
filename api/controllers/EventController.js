/**
 * EventControllerController
 *
 * @description :: Server-side logic for managing Eventcontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sendCall = function(num, res){
	var accountSid = sails.conf.twilio_key;
	var authToken = sails.conf.twilio_token;
	var client = require('twilio')(accountSid, authToken);
	 
	client.calls.create({
	    url: "http://twimlbin.com/146b3874",
	    statusCallback: "https://alfainfinity.co/event/callback",
	    statusCallbackMethod: "POST",
	    statusCallbackEvent: ["ringing", "answered", "completed"],
	    to: num,
	    from: "+1844-311-2532"
	}, function(err, call) {
		if(err){ 
			console.log(err);
			if(err.status == 400){
				console.log("error occured while calling. not a valid no.");
			}
		}
		else
		res.json({status: 'success', statusCode: 200});
	});
}
module.exports = {
	index: function(req, res){
		res.json('forbidden access');
	},	
	show: function(req, res){
		Event.find({}).exec(function(err, data){
			res.json(data);
		})
	},
	call: function(req, res){
		var phone = req.body.phone;
		console.log(phone);
		sendCall(phone, res);
	},
	callbackstatus: function(req, res){
		var called = req.body.Called;
		var status = req.body.CallStatus;
		console.log(status);
		var flash;
		var clas;
		Event.findOrCreate(req.body).exec(function(err, data){
			console.log(data);
			res.json(data);
		})
	}
};

