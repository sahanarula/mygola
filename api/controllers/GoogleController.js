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
		var dist = 1000;
		var radius = 500;
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
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latFinal +','+ lonFinal +'&radius=' + radius + '&types=amusement_park|doctor|food|gym|zoo|shopping_mall|restaurant|night_club|hospital|lodging|bar&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var info = JSON.parse(body);
		  	res.json(info.results); // Show the HTML for the Google homepage.
		  }
		});
	},
	getbatch: function(req, res){
		lat = req.param('lat');
		lon = req.param('lon');
		q = req.param('q');
		deg = req.param('deg');
		q = q.split(',');
		console.log(q);
		var results = [];
		var counts;
		var info;
		var R = 6378137;
		var alpha = 60;
		var dist = 1000;
		var radius = 500;
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
		for(i=0; i<q.length; i++){
			var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latFinal +','+ lonFinal +'&radius=500&types=' + q[i] + '&key=' + sails.conf.api_key + '&sensor=true';
			var response = sails.requestSync('GET', url);
			var result = JSON.parse(response.body.toString('utf8'));
			console.log(Object.keys(result).length);
			var counts = Object.keys(result).length;
			results.push({id: q[i], content: result, counts: counts});
		}
		console.log(json);
		res.json(results);

	}
};

