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
		this.emit(':ask', 'This is home agent skill. May I help you?');
		console.log('===== [initial] end');
	},
	'ControlDeviceIntent': function() {
		let ctrl = this.event.request.intent.slots.ctrl.value;
		let device = this.event.request.intent.slots.device.value.toLowerCase();
		console.log('============ Control Device ===========');
		console.log(' ctrl : ' + ctrl);
		console.log(' device : ' + device);
		switch (device) {
		case 'panel light':
			httppost('52.198.86.179', 8100, '/devctrl', {light2: {cmd: ctrl, delay: 0}}, function() {
				this.emit(':ask', 'Okay. Turning ' + ctrl + ' the panel light. Any request?');
			}.bind(this));
			break;
		case 'tv':
			httppost('52.198.86.179', 8100, '/devctrl', {tv: {power: ctrl, delay: 0}}, function() {
				this.emit(':ask', 'Okay. Turning ' + ctrl + ' the tv. Any request?');
			}.bind(this));
			break;
		case 'recorder':
			httppost('52.198.86.179', 8100, '/devctrl',
					 {tv: {power: ctrl, delay: 0}, recorder: {power: ctrl, delay: 0}},
					 function() {
						 this.emit(':ask', 'Okay. Turning ' + ctrl + ' the recorder.' +
								   'There are three titles.' +
								   'Since you are free until the 9 o\'clock, how about watching a movie?');
					 }.bind(this));
			break;
		default:
			this.emit(':tell', 'Unknown device. Good bye.');
		}
		console.log('===== Control Device end');
	},
	'StopIntent': function() {
		console.log('============ Stop ===========');
		this.emit(':tell', 'Okay. Good bye.');
		console.log('============ Stop End ===========');
	},
	'OkayIntent': function() {
		console.log('============ Okay ===========');
		httppost('52.198.86.179', 8100, '/devctrl', {recorder: {mode: 'play'}}, function() {
			this.emit(':tell', 'Okay. <prosody rate="x-slow"><amazon:effect name="whispered">' +
					  'setting the scene for horror movies. Enjoy.</amazon:effect></prosody>');
		}.bind(this));
		console.log('============ Okay End ===========');
	},
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
