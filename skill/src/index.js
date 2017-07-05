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
        console.log('sayHellow called')
		sendMessage(function() {
			this.emit(':tell', 'Hello World!');
		}.bind(this));
		console.log('sayHellow called 2')
	}
};

function sendMessage(callback) {
	http.get("http://52.198.86.179:8100/test1", function(res) {
		console.log("http.get response: " + res.statusCode);
		res.on("data", function(chunk) {
			console.log('http.get success')
			callback();
		});
	}).on('error', function(e) {
		console.log('http.get error')
		callback();
	});
}
