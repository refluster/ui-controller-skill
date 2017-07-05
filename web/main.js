'use strict';
const express = require('express')
const app = new (express)();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = 8100;

app.use(express.static('public'));

app.post('/test1', (req, res) => {
	console.log('test1 post');
	console.log(req.body);
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

app.listen(port, error => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});

