const http = require('http'); // To use the HTTP interfaces in Node.js
const fs = require('fs'); // For interacting with the file system
const papa = require('papaparse');
//const path = require('path'); // For working with file and directory paths
//const url = require('url'); // For URL resolution and parsing
const express = require('express');
const app = express();
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

app.use(express.static('public'));
app.set('view engine', 'ejs');

// desktop page
app.get('/', function (req, res) {
	//initGauges();
	//setGauges(150, 2250, 1000, 150, 2250);	
  res.render('index');
});

// mobile page
app.get('/mobile', function (req, res) {
  res.render('mobile');
});

// serve the page on port 1500
app.listen(1500, function () {
  console.log('HART Groundstation listening on port 1500!');
});
