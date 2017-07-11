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

app.post('/devctrl', (req, res) => {
	// { light: on/off, delay: Xsec }
	console.log('devctrl post');
	console.log('req.body ', req.body);
	var ctrl = req.body.light;
	var delay = (req.body.delay != undefined? req.body.delay: 0);
	if (ctrl == "on" || ctrl == "off") {
		setTimeout(() => {
			var cmd = 'pcpf-stub/ctrl-light.sh ' + ctrl
			console.log(cmd);
			exec(cmd, (err, stdout, stderr) => {
				if (err) { console.log(err); }
				console.log(stdout);
			});
		}, delay*1000);
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
