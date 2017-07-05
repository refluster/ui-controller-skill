'use strict';
const express = require('express')
const app = new (express)();
const port = 8100;

app.use(express.static('public'));

app.get('/test1', (req, res) => {
	console.log('test1');
	res.header("Content-Type", "application/json; charset=utf-8");
	res.send('[hoge]');
});

app.get('/test2', (req, res) => {
	console.log('test2');
	res.send('');
});

app.listen(port, error => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});

