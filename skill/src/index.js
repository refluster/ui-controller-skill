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
		console.log('============ [initial] ===========')
		console.log('hello called')
		sendMessage({page: 'page1'}, function() {
			this.emit(':ask', 'The train is behind the schedule. You can select 3 alternative routes.');
		}.bind(this));
		console.log('hello end')
	},
	'RouteIntent': function() {
		console.log('============ Route ===========')
		console.log('hello called')
		sendMessage({page: 'page1'}, function() {
			this.emit(':ask', 'Please leave home within 2 minutes.');
		}.bind(this));
		console.log('hello end')
	},
	'ShowIntent': function () {
	    let pageList = {'title': 'page1', 'contents': 'page2'};
	    console.log('============ Show ===========')
	    let slotWord = this.event.request.intent.slots.Page.value;
		console.log('slotWord: ' + slotWord);
		if (!(slotWord in pageList)) {
   			this.emit(':tell', 'unable to show unknown page, ' + slotWord);
   			return;
		}
		let targetPage = pageList[slotWord];
		console.log('target: ' + targetPage);
		sendMessage({page: targetPage}, function() {
			this.emit(':tell', 'displaying ' + targetPage);
		}.bind(this));
	}
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
