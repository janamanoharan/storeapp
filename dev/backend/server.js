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
mongoose.connect("mongodb://localhost:27017/ratingapp", function(err, db) {
    if(!err) {
        console.log("Database connection successful");
    } else {
        console.log("Database connection Failed");
    }
});

// listening setup
var hostname = 'localhost';
var port = 3000;

server.listen(process.env.PORT || port, function () {
    console.log(`Backend server running at http://${hostname}:${port}/`);
});