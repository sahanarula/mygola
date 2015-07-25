/**
 * GoogleControllerController
 *
 * @description :: Server-side logic for managing Googlecontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	index: function(req, res){
		lat = req.param('lat');
		lon = req.param('lon');
		console.log(lat);
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lon +'&radius=500&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	console.log(body);
		    res.json(response) // Show the HTML for the Google homepage.
		  }
		});
	}	
};
