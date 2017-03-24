var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost', 'ratingapp');

var Users = require('./models/User');
var Stores = require('./models/Store');

console.log('Population in progress');

var user1 = new Users({
    username: "JanaMano",
    firstname: "Janarthanan",
    lastname: "Manoharan",
    sex: "M",
    age: 20
});
user1.save();
var user2 = new Users({
    username: "chandrumano",
    firstname: "Chandru",
    lastname: "Manoharan",
    sex: "M",
    age: 24
});
user2.save();
var user3 = new Users({
    username: "sezhil",
    firstname: "Swedha",
    lastname: "Ezhil",
    sex: "F",
    age: 25
});
user3.save();
var user4 = new Users({
    username: "chandinicbcb",
    firstname: "Chandini",
    lastname: "Chandrabalan",
    sex: "F",
    age: 21
});
user3.save();
var user4 = new Users({
    username: "aishoo123",
    firstname: "Akshara",
    lastname: "CB",
    sex: "F",
    age: 16
});
user4.save();

var store1 = new Stores({
   storename: "Walmart",
   category: "Retail",
   address: "Scarborough" 
});

var store2 = new Stores({
   storename: "Metro",
   category: "Food",
   address: "Toronto" 
});

var store3 = new Stores({
   storename: "Zara",
   category: "Clothing",
   address: "Scarborough" 
});

var store4 = new Stores({
   storename: "H&M",
   category: "Clothing",
   address: "Brampton" 
});

var store5 = new Stores({
   storename: "No Frills",
   category: "Food",
   address: "Ajax" 
});

var store6 = new Stores({
   storename: "Walmart",
   category: "Retail",
   address: "Missisauga" 
});
store1.save();
store2.save();
store3.save();
store4.save();
store5.save();
store6.save();


console.log('Done');




