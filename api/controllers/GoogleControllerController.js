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
		var alpha = 15;
		var dist = 500;
		var radius = 250;
		var xDist = dist * Math.cos(deg/180*Math.PI);
		var yDist = dist * Math.sin(deg/180*Math.PI);
		dLat = yDist/R;
		dLon = xDist/(R*Math.cos(Math.PI*lat/180));
		lato = lat + dLat * 180/Math.PI;
		lono = lon + dLon * 180/Math.PI;
		latFinal = (lat+lato)/2;
		lonFinal = (lon+lono)/2;
		console.log(lato+"     askjddsakjd ");
		console.log(lono + "      alksdjsadk ");
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latFinal +','+ lonFinal +'&radius=dist&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	res.json(info.results); // Show the HTML for the Google homepage.
		  }
		});
	}	
};
