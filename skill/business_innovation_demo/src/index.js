'use strict';
var Alexa = require("alexa-sdk");
var http = require ('http');

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'LaunchRequest': function () {
		console.log('============ [initial] ===========');
		countUp.call(this);
		this.emit(':ask', 'This is home agent skill. May I help you?');
		console.log('===== [initial] end');
	},
	'ControlDeviceIntent': function() {
		console.log('============ Control Device ===========');
		let ctrl = this.event.request.intent.slots.ctrl.value;
		let device = this.event.request.intent.slots.device.value.toLowerCase();
		countUp.call(this);
		console.log(' ctrl : ' + ctrl);
		console.log(' device : ' + device);

		console.log('=== attributes ==== ');
		let k = Object.keys(this.attributes);
		for (var i = 0; i < k.length; i++) {
			let key = k[i];
			console.log(' -- key ' + key + ' : ' + this.attributes[key]);
		}
		console.log('=== attributes.end ==== ');

		switch (device) {
		case 'light':
			httppost('52.198.86.179', 8100, '/devctrl', {light2: {power: ctrl, delay: 0}}, function() {
				if (this.attributes.count !== 0) {
					this.emit(':ask', 'Okay. Turning ' + ctrl + ' the light. Any request?');
				} else {
					this.emit(':tell', 'Okay. Turning ' + ctrl + ' the light.');
				}
			}.bind(this));
			break;
		case 'air conditioner':
			httppost('52.198.86.179', 8100, '/devctrl', {ac: {power: ctrl, delay: 0}}, function() {
				if (this.attributes.count !== 0) {
					this.emit(':ask', 'Okay. Turning ' + ctrl + ' the air conditioner. Any request?');
				} else {
					this.emit(':tell', 'Okay. Turning ' + ctrl + ' the air conditioner.');
				}
			}.bind(this));
			break;
		case 'tv':
			httppost('52.198.86.179', 8100, '/devctrl', {tv: {power: ctrl, delay: 0}}, function() {
				if (this.attributes.count !== 0) {
					this.emit(':ask', 'Okay. Turning ' + ctrl + ' the tv. Any request?');
				} else {
					this.emit(':tell', 'Okay. Turning ' + ctrl + ' the tv.');
				}
			}.bind(this));
			break;
		case 'recorder':
			httppost('52.198.86.179', 8100, '/devctrl',
					 {tv: {power: ctrl, delay: 0, input: 'rec'}, recorder: {power: ctrl, delay: 0, mode: 'list'}},
					 function() {
						 this.emit(':ask', 'Okay. Turning ' + ctrl + ' the recorder. ' +
								   'There are 5 titles. ' +
								   'Since you are free until the 3 o\'clock, how about watching the movie?');
					 }.bind(this));
			break;
		default:
			this.emit(':ask', 'Unknown device. Any request?');
		}

		console.log('===== Control Device end');
	},
	'StopIntent': function() {
		console.log('============ Stop ===========');
		this.emit(':tell', 'Okay. Good bye.');
		console.log('============ Stop End ===========');
		delete this.attributes.count;
	},
	'OkayIntent': function() {
		console.log('============ Okay ===========');
		httppost('52.198.86.179', 8100, '/scenectrl', {name: 'theater'}, function() {
			this.emit(':tell', 'Okay. Setting the theater scene. Enjoy.');
		}.bind(this));

		console.log('============ Okay End ===========');
	},
	'Unhandled': function() {
		this.emit(':ask', 'Sorry, I didn\'t get that. Try saying again?', 'Try saying a number.');
	}
};

function httppost(host, port, path, data, callback) {
	let postDataStr = JSON.stringify(data);
	let options = {
		host: host,
		port: port,
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': postDataStr.length
		}
	};

	let req = http.request(options, (res) => {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log('BODY: ' + chunk);
			callback();
		});
	});
	req.on('error', (e) => {
		console.log('problem with request: ' + e.message);
	});
	req.write(postDataStr);
	req.end();
}

function countUp() {
	if (this.attributes.count === undefined) {
		this.attributes.count = 0;
	} else {
		this.attributes.count++;
	}
}
