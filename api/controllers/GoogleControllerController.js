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
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lon +'&radius=500&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	console.log(JSON.parse(response));
		  	response = JSON.parse(response);
		  	response = JSON.parse(response["html_attributions"]);
		  	response = JSON.parse(response.html_attributions);
		  	res.json(response) // Show the HTML for the Google homepage.
		  }
		});
	}	
};
