'use strict';
const conf = require('./conf.js')
const express = require('express')
const app = new (express)();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const request = require('request');
const exec = require('child_process').exec;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const port = 8100;

app.use(express.static('public'));

app.post('/pageset', (req, res) => {
	console.log('pageset post');
	console.log(req.body);
	io.emit('message', {pageset: req.body});
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[pageset]');
});

app.post('/movieset', (req, res) => {
	console.log('movieset post');
	console.log(req.body);
	io.emit('message', {movieset: req.body});
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[movieset]');
});

app.post('/devctrl', (req, res) => {
	// { light: on/off, delay: Xsec }
	console.log('devctrl post');
	console.log('req.body ', req.body);

	var sendCommandDelay = function(delay, callback) {
		setTimeout(callback, delay*1000);
	}

	if (req.body.light != undefined) {
		// light for design center
		var r = req.body.light;
		if (r.cmd == "on" || r.cmd == "off") {
			sendCommandDelay(r.delay, () => {
				var cmd = 'pcpf-stub/ctrl-light.sh ' + r.cmd;
				console.log(cmd);
				exec(cmd, (err, stdout, stderr) => {
					if (err) { console.log(err); }
					console.log(stdout);
				});
			});
		}
	}
	if (req.body.light2 != undefined) {
		var r = req.body.light2;
		if (r.power == "on" || r.power == "off") {
			sendCommandDelay(r.delay, () => {
				let paramList = [r.power == 'off' ? '0': '1'];
				eltPost(conf.dev.light[0].id, conf.kikiCode, conf.dev.light[0].nodeId, paramList);

				var cmd = 'pcpf-stub/ctrl-light2.sh ' + r.power;
				console.log(cmd);
				exec(cmd, (err, stdout, stderr) => {
					if (err) { console.log(err); }
					console.log(stdout);
				});
			});
		}
	}
	if (req.body.tv != undefined) {
		var r = req.body.tv;
		console.log({devctrl: {tv: r}});
		io.emit('device-view', {devctrl: {tv: r}});
	}
	if (req.body.recorder != undefined) {
		var r = req.body.recorder;
		console.log({devctrl: {recorder: r}});
		io.emit('device-view', {devctrl: {recorder: r}});
	}
	if (req.body.ac != undefined) {
		eltPost(conf.dev.ac[0].id, conf.kikiCode, conf.dev.ac[0].nodeId, ['0','1','27','0','6']);
		var r = req.body.ac;
		console.log({devctrl: {ac: r}});
		io.emit('device-view', {devctrl: {ac: r}});
	}
	if (req.body.shutter != undefined) {
		eltPost(conf.dev.shutter[0].id, conf.kikiCode, conf.dev.shutter[0].nodeId, ['2']);
		var r = req.body.shutter;
		console.log({devctrl: {shutter: r}});
		io.emit('device-view', {devctrl: {shutter: r}});
	}
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[devctrl]');
});

app.post('/scenectrl', (req, res) => {
	console.log('scenectrl post');
	console.log('req.body ', req.body);

	if (req.body.name != undefined) {
		var s = req.body.name;
		console.log('scene:', s);
		switch (s) {
		case 'theater':
			io.emit('device-view', {devctrl: {shutter: {status: 'close'}}});
			io.emit('device-view', {devctrl: {light: {scene: 'theater'}}});
			io.emit('device-view', {devctrl: {ac: {power: 'on', temp: '27'}}});

			eltPost(conf.dev.light[0].id, conf.kikiCode, conf.dev.light[0].nodeId, ['3']);
			exec('pcpf-stub/ctrl-light2.sh off', (err, stdout, stderr) => {
				if (err) { console.log(err); }
				console.log(stdout);
			});
			setTimeout(function() {
				eltPost(conf.dev.ac[1].id, conf.kikiCode, conf.dev.ac[1].nodeId, ['0','1','27','0','6','120']);
				setTimeout(function() {
					eltPost(conf.dev.shutter[0].id, conf.kikiCode, conf.dev.shutter[0].nodeId, ['2']);
				}.bind(this), 8000);
			}.bind(this), 5000);
			break;
		}
	}
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[scenectrl]');
});

app.post('/linepush', (req, res) => {
	console.log('linepush post');
	console.log(req.body);

	exec('./linepush.sh "' + req.body.value1 + '"', (err, stdout, stderr) => {
		if (err) { console.log(err); }
		console.log(stdout);
	});
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[linepush]');
});

io.on('connection', (socket) => {
	let query       = socket.handshake.query;
	let hoge        = query.hoge;

	socket.on('disconnect', function(){} );

	socket.on('on_name', ( data ) => {
		console.log(data);
		io.emit('emit_name', {data: data});
	});
});

function eltPost(id, kikiCode, nodeId, paramList) {
	let data = {
		kikiCode: kikiCode,
		nodeId: nodeId,
		paramList: paramList
	};
	console.log('/' + id);
	console.log(' ', data);

	var options = {
		uri: 'http://52.87.73.51:8100/action/' + id,
		headers: {
			"Content-type": "application/json",
		},
		json: data
	};
	request.post(options, function(error, response, body) {});
}

http.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});
