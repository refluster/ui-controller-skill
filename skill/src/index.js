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
		this.emit('SayHello');
	},
	'HelloWorldIntent': function () {
		this.emit('SayHello')
	},
	'SayHello': function () {
		console.log('sayHello called')
		sendMessage({page: 'page1'}, function() {
			this.emit(':tell', 'Hello World!');
		}.bind(this));
		console.log('sayHello end')
	},
	'TestIntent': function () {
		this.emit('SayTest')
	},
	'SayTest': function () {
		console.log('sayTest called')
		sendMessage({page: 'page2'}, function() {
			this.emit(':tell', 'This is test response');
		}.bind(this));
		console.log('sayTest end')
	},
};

function sendMessage(data, callback) {
	let postDataStr = JSON.stringify(data);
	let options = {
		host: '52.198.86.179',
		port: 8100,
		path: '/test1',
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
