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
		sails.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latFinal +','+ lonFinal +'&radius=' + radius + '&types=amusement_park|doctor|food|gym|zoo|shopping_mall|restaurant|night_club|hospital&key=' + sails.conf.api_key + '&sensor=true', function (error, response, body) {
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
		q = q.split(',');
		console.log(q);
		var results = [];
		var counts;
		var info;
		
		for(i=0; i<q.length; i++){
			counts = 0;
			var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lon +'&radius=500&types=' + q[i] + '&key=' + sails.conf.api_key + '&sensor=true';
			console.log(url);
			sails.request(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				  	info = JSON.parse(body);
				  	counts = info.length;
				  	results.push({counts: counts, result: info});
				  	console.log(i);
				  	console.log(q.length);
					if(i == (q.length-1)){
						console.log(i);
					}
				}
			});	
		}	
	}
};
