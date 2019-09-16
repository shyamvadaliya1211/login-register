var text = require('textbelt');
var request = require('request');


exports.longitudeLatitude = function(req, res) {
	console.log('>>>>>>>>>>>>>>. H1');
	var https = require('follow-redirects').https;

	var placeDetails = function() {
		this.places = [];
	}

	//Step 1: Get coordinates based on the entered zipcode.

	function getCoordinates(zipcode) {
		https.request({
			host: 'maps.googleapis.com',
			path: '/maps/api/geocode/json?address=' + zipcode + '&key=[YOUR API KEY]',
			method: 'GET'},
			CoordinateResponse).end();
	}

	//Step 2: Find places within the specified radius, based on the coordinates provided by the getCoordinates function.

	function placeSearch(latitude, longitude, radius) {
		https.request({
			host: 'maps.googleapis.com',
			path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=restaurant&key=[YOUR API KEY]',
			method: 'GET'},
			PlaceResponse).end();
	}

	function CoordinateResponse(response) {
		var data = "";
		var sdata = "";
		var latitude = "";
		var longitude = "";

		response.on('data', function(chunk) {
			data += chunk;
		});
		response.on('end', function() {
			sdata = JSON.parse(data);
			latitude = sdata.results[0].geometry.viewport.northeast.lat;
			longitude = sdata.results[0].geometry.viewport.northeast.lng;
			placeSearch(latitude, longitude, 50000);
		});
	}

	function PlaceResponse(response) {
		var p;
		var data = "";
		var sdata = "";
		var PD = new placeDetails();

		response.on('data', function(chunk) {
			data += chunk;
		});
		response.on('end', function() {
			sdata = JSON.parse(data);
			if (sdata.status === 'OK') {
				console.log('Status: ' + sdata.status);
				console.log('Results: ' + sdata.results.length);
				for (p = 0; p < sdata.results.length; p++) {
					PD.places.push(sdata.results[p]);
				}
				for (r = 0; r < sdata.results.length; r++) {
					console.log('----------------------------------------------');
					console.log(PD.places[r].name);
					console.log('Place ID (for Place Detail search on Google):' + PD.places[r].place_id);
					console.log('Rating: ' + PD.places[r].rating);
					console.log('Vicinity: ' + PD.places[r].vicinity);
				}
			} else {
				console.log(sdata.status);
			}
		});
	}

	getCoordinates(37202);
	res.json({
		status: true,
	})
};



exports.testSendMessage = function() {
	// text('8238887873', 'A sample text message!', undefined, function(err) {
 //  		if (err) {
 //    		console.log(err);
 //  		}
	// });
	// request.post('https://textbelt.com/text', {
 //  		form: {
 //    		phone: '+918128633309',
 //    		message: 'Hello world',
 //    		key: 'textbelt',
 //  		},
	// }, function(err, httpResponse, body) {
	// 	if (err) {
	// 		console.error('Error:', err);
	// 		return;
	// 	}
	// 	console.log(JSON.parse(body));
	// });

	const Nexmo = require('nexmo');

	const nexmo = new Nexmo({
	  apiKey: 'c914d5d6',
	  apiSecret: 'u1Sv37VOivprdlRT',
	});

	const from = 918238887873;
	const to = 919979387871;
	const text = 'A text message sent using the Nexmo SMS API';

	nexmo.message.sendSms(from, to, text, (err, responseData) => {
	    if (err) {
	        console.log(err);
	    } else {
	        if(responseData.messages[0]['status'] === "0") {
	            console.log("Message sent successfully.");
	        } else {
	            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
	        }
	    }
	})
};

exports.testSendMessage();

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 11;
rule.minute = 1;
 
var j = schedule.scheduleJob(rule, function(){
  console.log('Today is recognized by Rebecca Black!');
});