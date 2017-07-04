'use strict';
const express = require('express')
const app = new (express)();
const port = 3000;

app.use(express.static('public'));

//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html')
//});

app.listen(port, error => {
	if (error) {
		console.error(error);
	} else {
		console.info('listen: ', port);
	}
});

