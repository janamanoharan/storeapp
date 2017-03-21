// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
var server = require('http').Server(app);

// database setup
mongoose.connect("mongodb://localhost:27017/ratingApp", function(err, db) {
  if(!err) {
    console.log("Connection successful");
  }
});

var hostname = 'localhost';
var port = 3000;

//var applicationRoute = require('./router/application')(app);

// listening setup
server.listen(process.env.PORT || port, function () {
    console.log(`Backend server running at http://${hostname}:${port}/`);
});