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
		httppost('/test1', {page: 'page1'}, function() {
			this.emit(':ask', 'The train is behind the schedule. You can select 3 alternative routes.');
		}.bind(this));
		console.log('===== [initial] end')
	},
	'RouteIntent': function() {
		console.log('============ Route ===========')
		httppost('/test1', {page: 'page1'}, function() {
			this.emit(':ask', 'Please leave home within 2 minutes.');
		}.bind(this));
		console.log('===== Route end')
	},
	'LeaveIntent': function() {
		console.log('============ Leave ===========')
		httppost('/test1', {page: 'page1'}, function() {
			this.emit(':tell', 'Okay. Turning off the light and air conditioner in a minute. See you later.');
		}.bind(this));
		console.log('===== Leave end')
	},
	'ShowIntent': function () {
	    console.log('============ Show ===========')
		//let pageList = {'title': 'page1', 'contents': 'page2'};
		//let slotWord = this.event.request.intent.slots.Page.value;
		//console.log('slotWord: ' + slotWord);
		let targetPage = this.event.request.intent.slots.Page.value;
		//if (!(slotWord in pageList)) {
		//	this.emit(':tell', 'unable to show unknown page, ' + slotWord);
		//	return;
		//}
		//let targetPage = pageList[slotWord];
		console.log('target: ' + targetPage);
		httppost('/test1', {page: targetPage}, function() {
			this.emit(':tell', 'displaying ' + targetPage);
		}.bind(this));
	}
};

function httppost(path, data, callback) {
	let postDataStr = JSON.stringify(data);
	let options = {
		host: '52.198.86.179',
		port: 8100,
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
