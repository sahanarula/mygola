/**
 * GoogleControllerController
 *
 * @description :: Server-side logic for managing Googlecontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	index: function(req, res){
		console.log(req.param('lat'));
		console.log(req.param('long'));
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.9123564,77.64214390000006&radius=500&types=food&name=cruise&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	res.json(body);
		  }
		});
	}	
};

