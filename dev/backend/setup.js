var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost', 'ratingapp');

var Users = require('./models/User');

console.log('Population in progress');

var newUser = new Users({
    username: "JanaMano",
    firstname: "Janarthanan",
    lastname: "Manoharan",
    sex: "M",
    age: 20
});

newUser.save();

console.log('Done');




