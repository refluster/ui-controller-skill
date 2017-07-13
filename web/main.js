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

app.post('/test1', (req, res) => {
	console.log('test1 post');
	console.log(req.body);
	io.emit('pageset', req.body);
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[hoge]');
});

app.post('/pageset', (req, res) => {
	console.log('pageset post');
	console.log(req.body);
	io.emit('pageset', req.body);
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[pageset]');
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
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[hoge]');
});

app.get('/test1', (req, res) => {
	console.log('test1 get');
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[hoge]');
});

app.get('/test2', (req, res) => {
	console.log('test2 get');
	res.send('');
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

http.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});
