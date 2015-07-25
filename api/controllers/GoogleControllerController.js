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
		deg = req.param('deg');
		var R = 6378137;
		var alpha = 60;
		var dist = 500;
		var radius = 250;
		var xDist = dist * Math.cos(deg/180*Math.PI);
		var yDist = dist * Math.sin(deg/180*Math.PI);
		dLat = yDist/R;
		dLon = xDist/(R*Math.cos(Math.PI*lat/180));
		ans = dLat * 180/Math.PI;
		lato = parseFloat(lat) + parseFloat(ans);
		ans = dLon * 180/Math.PI;
		lono = parseFloat(lon) + parseFloat(ans);
		latFinal = parseFloat((parseFloat(lat)+parseFloat(lato))/2);
		lonFinal = parseFloat((parseFloat(lon)+parseFloat(lono))/2);
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latFinal +','+ lonFinal +'&radius=' + radius + '&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	res.json(info.results); // Show the HTML for the Google homepage.
		  }
		});
	},
	nearbycities: function(req, res){
		lat = req.param('lat');
		lon = req.param('lon');
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lon +'&types=administrative_area_level_2&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	res.json(info.results); // Show the HTML for the Google homepage.
		  }
		});	
	}	
};
