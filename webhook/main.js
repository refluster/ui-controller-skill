'use strict';
const express = require('express')
const app = new (express)();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
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
		var r = req.body.ac;
		console.log({devctrl: {ac: r}});
		io.emit('device-view', {devctrl: {ac: r}});
	}
	if (req.body.shutter != undefined) {
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
			eltPost('3', '99935', '00001', [0, 1, 2]);
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
}

http.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});
